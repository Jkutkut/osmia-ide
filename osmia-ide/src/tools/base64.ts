const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const nbrToBase64 = (n: number) => {
  let result = '';
  while (n > 0) {
    result = BASE64_CHARS[n % 64] + result;
    n = Math.floor(n / 64);
  }
  return result;
};

const base64ToNbr = (s: string) => {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    result = result * 64 + BASE64_CHARS.indexOf(s[i]);
  }
  return result;
};

export { base64ToNbr, nbrToBase64 };
