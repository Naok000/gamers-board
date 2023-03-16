// import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Posting } from '@prisma/client';

type posting = {
  id: string;
  title: string;
  content?: string | null;
};

export const useMutatePosting = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

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
        const previousData = queryClient.getQueryData<Posting[]>(['postings']);
        if (previousData) {
          queryClient.setQueriesData(['postings'], [res, ...previousData]);
        }
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  return { createPostingMutation };
};
