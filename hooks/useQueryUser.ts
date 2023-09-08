import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { User } from '@prisma/client';
import { userProfile } from './types/queryType';
import { USER } from '../consts/queryKey';

export const getUserSession = async () => {
  const { data } = await axios.get<Omit<User, 'password'>>(
    `${process.env.NEXT_PUBLIC_API_URL}/user/session-id`
  );
  return data;
};

export const useQueryUser = () => {
  const router = useRouter();
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
        router.push('/auth/login');
    },
  });
};
