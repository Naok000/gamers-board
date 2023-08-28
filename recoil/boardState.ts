import { atom } from 'recoil';

export type SessionUser = {
  id: string;
  role: string;
};

export const currentUserId = atom<SessionUser | undefined>({
  key: 'currentUserId',
  default: undefined,
});
