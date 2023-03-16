import { atom } from 'recoil';
import { User } from '@prisma/client';

// export type User = {
//   uid: string;
//   username?: string;
// };

export const currentUser = atom<Omit<User, 'password'> | undefined>({
  key: 'currentUser',
  default: undefined,
});

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
});
