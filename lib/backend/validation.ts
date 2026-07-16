export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function cleanPersonalization(value: string | undefined) {
  if (!value) {
    return undefined;
  }
  return value.trim().toUpperCase();
}
