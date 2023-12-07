import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BookMark, User } from '@prisma/client';
import { userProfile } from './types/queryType';
import { BOOK_MARK, USER } from '../consts/queryKey';
import { toastSummary } from '../utils/toastSummary';

export const getUserSession = async () => {
  const { data } = await axios.get<Omit<User, 'password'>>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/session-id`
  );
  return data;
};

export const useQueryUser = () => {
  const router = useRouter();
  const { notAuthorizedAlertToast } = toastSummary();
  const getUser = async () => {
    const { data } = await axios.get<userProfile>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`
    );
    return data;
  };

  return useQuery<userProfile, Error>({
    queryKey: [USER],
    queryFn: getUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        notAuthorizedAlertToast();
      router.push('/auth/login');
    },
  });
};

export const useQueryBookmark = () => {
  const router = useRouter();
  const getownBookmark = async () => {
    const { data } = await axios.get<BookMark[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/user/bookmark`
    );
    return data;
  };

  return useQuery<BookMark[], Error>({
    queryKey: [BOOK_MARK],
    queryFn: getownBookmark,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/auth/login');
    },
  });
};
