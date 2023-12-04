import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { Posting, BookMark } from '@prisma/client';
import { useRouter } from 'next/router';
import { BOOK_MARK, COMMENT, POSTING } from '../consts/queryKey';
import { posting, comment } from './types/queryType';

export const useMutatePosting = (
  postingId?: string | string[] | undefined
): {
  createPostingMutation: UseMutationResult<
    any,
    any,
    Omit<posting, 'id'>,
    unknown
  >;
  bookMarkAddMutation: UseMutationResult<
    any,
    any,
    string | string[] | undefined,
    unknown
  >;
  removeBookMarkMutation: UseMutationResult<
    void,
    any,
    string | string[] | undefined,
    unknown
  >;
  commentPostingMutation: UseMutationResult<
    any,
    any,
    Omit<comment, 'id'>,
    {
      previousData: Comment[];
    }
  >;
  deletePostingMutation: UseMutationResult<
    void,
    any,
    string | string[] | undefined,
    unknown
  >;
} => {
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
      onMutate: async (res) => {
        await queryClient.cancelQueries([COMMENT]);
        const previousData = queryClient.getQueryData<Comment[]>([COMMENT]);
        if (previousData) {
          // update to the new value
          queryClient.setQueryData([COMMENT], [res, ...previousData]);

          // return snapshotted value
          return { previousData };
        }
      },
      onError: (err: any, context) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err);
          router.push('/board');
        }
        queryClient.setQueryData([COMMENT], context.comment);
      },
      onSettled: () => {
        queryClient.invalidateQueries([COMMENT]);
      },
    }
  );

  const bookMarkAddMutation = useMutation(
    async (postingId: string | string[] | undefined) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}/book-mark`
      );
      return res;
    },
    {
      onSuccess: async (res) => {
        await queryClient.cancelQueries([BOOK_MARK]);
        const previousData = queryClient.getQueryData<BookMark[]>([BOOK_MARK]);
        if (previousData) {
          queryClient.setQueryData([BOOK_MARK], [res, ...previousData]);
        }

        return { previousData };
      },
      onError: (res: any, err: any) => {
        if (err.response.status === 401 || err.response.status === 403) {
          console.log(err, res);
          router.push('/board');
        }
      },
    }
  );

  const removeBookMarkMutation = useMutation(
    async (postingId: string | string[] | undefined) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}/book-mark`
      );
    },
    {
      onSuccess: (_, variables) => {
        const previousData = queryClient.getQueryData<BookMark[]>([BOOK_MARK]);
        if (previousData) {
          queryClient.setQueryData(
            [BOOK_MARK],
            previousData.filter((posting) => posting.id !== variables)
          );
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
    async (postingId: string | string[] | undefined) => {
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
    bookMarkAddMutation,
    removeBookMarkMutation,
    deletePostingMutation,
  };
};
