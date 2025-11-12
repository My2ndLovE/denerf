import conversationData from '@/data/conversations.json';
import type { ConversationNode, Section } from './conversation.types';
import { ResponseMatcher } from './ResponseMatcher';
import { MessageQueue } from './MessageQueue';
import { useConversationStore } from '../store/conversationStore';
import { useAvatarStore } from '../store/avatarStore';

export class ConversationEngine {
  private matcher: ResponseMatcher;
  private messageQueue: MessageQueue;

  constructor() {
    this.matcher = new ResponseMatcher();
    this.messageQueue = new MessageQueue();
  }

  /**
   * Initialize the conversation engine
   */
  initialize(): void {
    const startNode = conversationData.nodes[conversationData.startNode];
    this.loadNode(startNode);
    useConversationStore.getState().setConversationStarted(true);
  }

  /**
   * Load a conversation node
   */
  private loadNode(node: ConversationNode): void {
    useConversationStore.getState().setCurrentNode(node);
    useConversationStore.getState().setCurrentOptions(node.options || []);

    // Queue messages
    this.messageQueue.addMessages(node.messages);
    this.messageQueue.process();
  }

  /**
   * Handle option selection
   */
  async selectOption(optionId: string): Promise<void> {
    const { currentNode } = useConversationStore.getState();
    if (!currentNode) return;

    const option = currentNode.options?.find(o => o.id === optionId);
    if (!option) return;

    // Get response node
    const responseNode = conversationData.nodes[option.responseNodeId];
    if (!responseNode) return;

    // Load response node
    this.loadNode(responseNode);

    // Execute action if any
    if (responseNode.action) {
      await this.executeAction(responseNode.action);
    }
  }

  /**
   * Handle text input
   */
  async handleTextInput(input: string): Promise<void> {
    const { currentNode } = useConversationStore.getState();
    if (!currentNode?.allowTextInput) return;

    // Match input to option keywords
    const matchedOption = this.matcher.match(input, currentNode.options || []);

    if (matchedOption) {
      await this.selectOption(matchedOption.id);
    } else {
      // Show fallback response
      this.showFallbackResponse();
    }
  }

  /**
   * Transition to a section
   */
  transitionToSection(section: Section): void {
    useConversationStore.getState().setCurrentSection(section);

    // Find entry node for this section
    const sectionNode = Object.values(conversationData.nodes).find(
      (node: any) => node.section === section && node.isEntryPoint
    );

    if (sectionNode) {
      this.loadNode(sectionNode as ConversationNode);
    }
  }

  /**
   * Show fallback response
   */
  private showFallbackResponse(): void {
    const fallbackMessage = {
      id: `fallback-${Date.now()}`,
      text: this.matcher.getFallbackResponse(),
      delay: 500,
      avatarState: 'speaking' as const
    };

    this.messageQueue.addMessage(fallbackMessage);
    this.messageQueue.process();
  }

  /**
   * Execute conversation action
   */
  private async executeAction(action: any): Promise<void> {
    switch (action.type) {
      case 'scrollToSection':
        await this.scrollToSection(action.payload.section);
        break;

      case 'celebrate':
        this.celebrate();
        break;

      case 'openLink':
        window.open(action.payload.url, '_blank');
        break;
    }
  }

  /**
   * Scroll to section smoothly
   */
  private async scrollToSection(section: Section): Promise<void> {
    // Wait for messages to complete
    await this.sleep(1000);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Wait for scroll to complete, then transition
      await this.sleep(1000);
      this.transitionToSection(section);
    }
  }

  /**
   * Trigger celebration
   */
  private celebrate(): void {
    useAvatarStore.getState().setState('celebrating');

    // Optional: Add confetti or other celebration effects
    // This can be extended later

    setTimeout(() => {
      useAvatarStore.getState().setState('idle');
    }, 2000);
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const conversationEngine = new ConversationEngine();
