import type { ButtonOption } from './conversation.types';

export class ResponseMatcher {
  /**
   * Match user input to button options based on keywords
   */
  match(input: string, options: ButtonOption[]): ButtonOption | null {
    const normalized = input.toLowerCase().trim();

    // Find the best match based on keyword presence
    let bestMatch: ButtonOption | null = null;
    let maxMatches = 0;

    for (const option of options) {
      let matches = 0;

      for (const keyword of option.keywords) {
        if (normalized.includes(keyword.toLowerCase())) {
          matches++;
        }
      }

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = option;
      }
    }

    return maxMatches > 0 ? bestMatch : null;
  }

  /**
   * Get fallback response when no match is found
   */
  getFallbackResponse(): string {
    const fallbacks = [
      "Hmm, I'm not quite sure what you mean. Try clicking one of the buttons below! 🤔",
      "Interesting! But I'd love to know more. Pick one of the options below! 👇",
      "That's a good question! Let's explore the options below. 👀",
      "I want to help! Try selecting one of these options. 😊"
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}
