export const generateFileName = (imgName: string): string => {
  const seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLentgth = 16;
  const randomChar = Array.from(
    crypto.getRandomValues(new Uint32Array(charLentgth))
  )
    .map((n) => seed[n % seed.length])
    .join('');

  const fileName = randomChar + '_' + imgName;

  return fileName;
};
