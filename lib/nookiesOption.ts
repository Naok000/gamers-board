const expiersIn = 60 * 10;

export const options = {
  maxAge: expiersIn,
  sameSite: 'none',
  secure: true,
  path: '/',
};
