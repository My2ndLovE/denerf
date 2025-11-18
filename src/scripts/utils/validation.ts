/**
 * Form Validation Utilities
 * Input validation, sanitization, error handling
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 * @param email - Email to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();

  if (!trimmed) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateRequired(value: string, fieldName: string = 'This field'): ValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
}

/**
 * Validate minimum length
 * @param value - Value to validate
 * @param minLength - Minimum length
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string = 'This field'
): ValidationResult {
  const trimmed = value.trim();

  if (trimmed.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Validate maximum length
 * @param value - Value to validate
 * @param maxLength - Maximum length
 * @param fieldName - Field name for error message
 * @returns Validation result
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string = 'This field'
): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${maxLength} characters`,
    };
  }

  return { isValid: true };
}

/**
 * Sanitize string input (prevent XSS)
 * @param input - Input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Show field error
 * @param input - Input element
 * @param message - Error message
 */
export function showFieldError(input: HTMLInputElement | HTMLTextAreaElement, message: string): void {
  // Remove existing error
  removeFieldError(input);

  // Add error class
  input.classList.add('error');
  input.setAttribute('aria-invalid', 'true');

  // Create error message
  const errorId = `${input.id || input.name}-error`;
  const errorEl = document.createElement('span');
  errorEl.id = errorId;
  errorEl.className = 'field-error text-sm text-red-500 mt-1';
  errorEl.textContent = message;
  errorEl.setAttribute('role', 'alert');

  // Insert after input
  input.parentElement?.appendChild(errorEl);
  input.setAttribute('aria-describedby', errorId);
}

/**
 * Remove field error
 * @param input - Input element
 */
export function removeFieldError(input: HTMLInputElement | HTMLTextAreaElement): void {
  input.classList.remove('error');
  input.removeAttribute('aria-invalid');

  const errorId = input.getAttribute('aria-describedby');
  if (errorId) {
    const errorEl = document.getElementById(errorId);
    errorEl?.remove();
    input.removeAttribute('aria-describedby');
  }
}
