
export function generateIdWithAlphabet(prefix = '', length = 10) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let postfix = '';
  for (let i = 0; i < length; i++) {
    postfix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `${prefix}-${postfix}`;
}
