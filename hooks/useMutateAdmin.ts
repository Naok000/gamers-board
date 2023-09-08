import { Posting, User } from '@prisma/client';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { POSTING_LIST, USER_LIST } from '../consts/queryKey';

export const useMutateAdmin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteUserAdminMutation = useMutation(
    async (userId: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${userId}`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousData = queryClient.getQueryData<User[]>([USER_LIST]);
        if (previousData) {
          queryClient.setQueryData(
            [USER_LIST],
            previousData.filter((user) => user.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err.respopnse.status === 401 || err.response.status === 403) {
          router.push('/admin');
        }
      },
    }
  );

  const deletePostingAdminMutation = useMutation(
    async (postingId: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/posting/${postingId}`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousData = queryClient.getQueryData<Posting[]>([
          POSTING_LIST,
        ]);
        if (previousData) {
          queryClient.setQueryData(
            [POSTING_LIST],
            previousData.filter((posting) => posting.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err.respopnse.status === 401 || err.response.status === 403) {
          router.push('/admin');
        }
      },
    }
  );

  return { deleteUserAdminMutation, deletePostingAdminMutation };
};
