import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Posting } from '@prisma/client';
import { useRouter } from 'next/router';
import { COMMENT, POSTING } from './queryKey';
import { posting, comment } from './types/queryType';

export const useMutatePosting: any = (
  postingId?: string | string[] | undefined
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createPostingMutation = useMutation(
    async (posting: Omit<posting, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/board/create`,
        posting
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousData = queryClient.getQueryData<posting[]>([POSTING]);
        if (previousData) {
          queryClient.setQueryData([POSTING], [res, ...previousData]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err);
          router.push('/board');
        }
      },
    }
  );

  const commentPostingMutation = useMutation(
    async (comment: Omit<comment, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}/post-comment`,
        comment
      );
      return res.data;
    },
    {
      onSuccess: (res) => {
        const previousData = queryClient.getQueryData<Comment[]>([COMMENT]);
        if (previousData) {
          queryClient.setQueryData([COMMENT], [res, ...previousData]);
        }
      },
      onError: (err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err);
          router.push('/board');
        }
      },
    }
  );

  const deletePostingMutation = useMutation(
    async (postingId: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousData = queryClient.getQueryData<Posting[]>([POSTING]);
        if (previousData) {
          queryClient.setQueryData(
            [POSTING],
            previousData.filter((posting) => posting.id !== variables)
          );
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err);
          router.push('/board');
        }
      },
    }
  );

  return {
    createPostingMutation,
    commentPostingMutation,
    deletePostingMutation,
  };
};
