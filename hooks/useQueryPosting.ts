// import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Comment, Posting } from '@prisma/client';

export const useQueryPosting = () => {
  const getPosting = async () => {
    const { data } = await axios.get<Posting[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/board`
    );
    return data;
  };
  return useQuery<Posting[], Error>({
    queryKey: ['postings'],
    queryFn: getPosting,
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useQueryPostingId = (postingId: string | string[] | undefined) => {
  const getPostingId = async () => {
    const { data } = await axios.get<Posting>(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}`
    );
    return data;
  };
  return useQuery<Posting, Error>({
    queryKey: ['postings', postingId],
    queryFn: getPostingId,
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useQueryComment = (postingId: string | string[] | undefined) => {
  const getComment = async () => {
    const { data } = await axios.get<Comment[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}/comment`
    );
    return data;
  };
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postingId],
    queryFn: getComment,
    onError: (err: any) => {
      console.log(err);
    },
  });
};
