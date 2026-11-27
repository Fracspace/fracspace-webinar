import "server-only";

/**
 * Normalizes Indian phone numbers into "91XXXXXXXXXX" format.
 * - Accepts 10 digits starting with 6-9
 * - Accepts with 0 prefix (11 digits, where 2nd digit is 6-9)
 * - Accepts with 91 prefix (12 digits, where 3rd digit is 6-9)
 * - Returns "91XXXXXXXXXX" or null if invalid.
 */
export function normalizeIndianPhone(input: string | null | undefined): string | null {
  if (!input || typeof input !== "string") {
    return null;
  }

  // Strip all non-digit characters
  const digits = input.replace(/\D/g, "");

  // Standard 10-digit Indian mobile number: 6, 7, 8, or 9 as first digit
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return `91${digits}`;
  }

  // 11 digits starting with 0
  if (digits.length === 11 && digits.startsWith("0") && /^[6-9]/.test(digits[1])) {
    return `91${digits.slice(1)}`;
  }

  // 12 digits starting with 91
  if (digits.length === 12 && digits.startsWith("91") && /^[6-9]/.test(digits[2])) {
    return digits;
  }

  return null;
}
