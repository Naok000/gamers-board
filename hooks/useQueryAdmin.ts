import { Posting, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

interface userPostingList extends Posting {
  user: User;
}

export const useQueryAdminUser = () => {
  const router = useRouter();
  const getAllUser = async () => {
    const { data } = await axios.get<Omit<User[], 'password'>>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/user`
    );
    return data;
  };

  return useQuery<Omit<User[], 'password'>, Error>({
    queryKey: ['userList'],
    queryFn: getAllUser,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/board');
    },
  });
};

export const useQueryAdminPosting = () => {
  const router = useRouter();
  const getAllPosting = async () => {
    const { data } = await axios.get<userPostingList[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/posting`
    );
    return data;
  };

  return useQuery<userPostingList[], Error>({
    queryKey: ['postingList'],
    queryFn: getAllPosting,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/board');
    },
  });
};
