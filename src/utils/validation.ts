// ─── Primitives ───────────────────────────────────────────────────────────────

export function isEmpty(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim() === ''
}

export function isRequired(value: string | null | undefined, fieldName = 'This field'): string | null {
  return isEmpty(value) ? `${fieldName} is required.` : null
}

// ─── Email ────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim())
}

export function validateEmail(email: string): string | null {
  if (isEmpty(email)) return 'Email is required.'
  if (!isValidEmail(email)) return 'Please enter a valid email address.'
  return null
}

// ─── Password ─────────────────────────────────────────────────────────────────

export interface PasswordRules {
  minLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireNumber?: boolean
  requireSpecialChar?: boolean
}

const DEFAULT_PASSWORD_RULES: PasswordRules = {
  minLength: 8,
  requireUppercase: false,
  requireLowercase: false,
  requireNumber: false,
  requireSpecialChar: false,
}

export function validatePassword(password: string, rules: PasswordRules = {}): string | null {
  const r = { ...DEFAULT_PASSWORD_RULES, ...rules }
  if (isEmpty(password)) return 'Password is required.'
  if (password.length < (r.minLength ?? 8)) return `Password must be at least ${r.minLength} characters.`
  if (r.requireUppercase && !/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.'
  if (r.requireLowercase && !/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.'
  if (r.requireNumber && !/\d/.test(password)) return 'Password must contain at least one number.'
  if (r.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character.'
  return null
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (isEmpty(confirm)) return 'Please confirm your password.'
  if (password !== confirm) return 'Passwords do not match.'
  return null
}

// ─── Phone ────────────────────────────────────────────────────────────────────

// Matches common international formats: +1 555 123 4567 / 0555-123-4567 / etc.
const PHONE_REGEX = /^\+?[\d\s\-().]{7,15}$/

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone.trim())
}

export function validatePhone(phone: string): string | null {
  if (isEmpty(phone)) return 'Phone number is required.'
  if (!isValidPhone(phone)) return 'Please enter a valid phone number.'
  return null
}

// ─── Name ─────────────────────────────────────────────────────────────────────

export function validateName(name: string, fieldName = 'Name'): string | null {
  if (isEmpty(name)) return `${fieldName} is required.`
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters.`
  if (name.trim().length > 100) return `${fieldName} must be under 100 characters.`
  return null
}

// ─── URL ──────────────────────────────────────────────────────────────────────

const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i

export function isValidUrl(url: string): boolean {
  return URL_REGEX.test(url.trim())
}

export function validateUrl(url: string): string | null {
  if (isEmpty(url)) return 'URL is required.'
  if (!isValidUrl(url)) return 'Please enter a valid URL.'
  return null
}

// ─── Number ───────────────────────────────────────────────────────────────────

export function validateNumber(
  value: string,
  options: { min?: number; max?: number; fieldName?: string } = {},
): string | null {
  const { min, max, fieldName = 'Value' } = options
  if (isEmpty(value)) return `${fieldName} is required.`
  const num = Number(value)
  if (isNaN(num)) return `${fieldName} must be a valid number.`
  if (min !== undefined && num < min) return `${fieldName} must be at least ${min}.`
  if (max !== undefined && num > max) return `${fieldName} must be no more than ${max}.`
  return null
}

// ─── OTP / Code ───────────────────────────────────────────────────────────────

export function validateOtp(otp: string, length = 6): string | null {
  if (isEmpty(otp)) return 'Verification code is required.'
  if (!/^\d+$/.test(otp)) return 'Code must contain digits only.'
  if (otp.length !== length) return `Code must be ${length} digits.`
  return null
}

// ─── Batch validator ─────────────────────────────────────────────────────────
// Pass multiple validators and get the first error, or null if all pass.
// Usage: const error = validate(email, [validateEmail, someOtherRule])

export function validate(
  value: string,
  validators: Array<(v: string) => string | null>,
): string | null {
  for (const validator of validators) {
    const error = validator(value)
    if (error) return error
  }
  return null
}
