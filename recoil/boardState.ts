import { atom } from 'recoil';

export type SessionUser = {
  id: string;
};

export const currentUserId = atom<SessionUser | undefined>({
  key: 'currentUserId',
  default: undefined,
});

export const isLoginState = atom<boolean>({
  key: 'isLogin',
  default: false,
});
