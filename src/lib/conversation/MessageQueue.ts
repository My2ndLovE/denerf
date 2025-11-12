import type { Message } from './conversation.types';
import { useConversationStore } from '../store/conversationStore';
import { useAvatarStore } from '../store/avatarStore';

export class MessageQueue {
  private queue: Message[] = [];
  private isProcessing = false;

  /**
   * Add messages to the queue
   */
  addMessages(messages: Message[]): void {
    this.queue.push(...messages);
  }

  /**
   * Add a single message to the queue
   */
  addMessage(message: Message): void {
    this.queue.push(message);
  }

  /**
   * Process the queue
   */
  async process(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;
    useConversationStore.getState().setIsAvatarSpeaking(true);

    while (this.queue.length > 0) {
      const message = this.queue.shift();
      if (!message) break;

      // Wait for delay
      await this.sleep(message.delay);

      // Update avatar state
      useAvatarStore.getState().setState(message.avatarState);

      // Add message to store
      useConversationStore.getState().addMessage(message);

      // Wait a bit for the message to be displayed
      await this.sleep(300);
    }

    this.isProcessing = false;
    useConversationStore.getState().setIsAvatarSpeaking(false);
    useAvatarStore.getState().setState('idle');
  }

  /**
   * Clear the queue
   */
  clear(): void {
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Get queue length
   */
  get length(): number {
    return this.queue.length;
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
