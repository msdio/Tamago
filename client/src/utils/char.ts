export function isHangulChar(word: string) {
  if (!word) return false;
  const c = word.charCodeAt(0);
  if (0x1100 <= c && c <= 0x11ff) return true;
  if (0x3130 <= c && c <= 0x318f) return true;
  if (0xac00 <= c && c <= 0xd7a3) return true;

  return false;
}

export function isEnglishChar(word: string) {
  if (!word) return false;
  const c = word.charCodeAt(0);
  if (65 <= c && c <= 90) return true;
  if (97 <= c && c <= 122) return true;

  return false;
}
