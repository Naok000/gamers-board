import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Comment, Posting, User } from '@prisma/client';

interface userComment extends Comment {
  user: User;
}

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
    const { data } = await axios.get<userComment[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}/comment`
    );
    return data;
  };
  return useQuery<userComment[], Error>({
    queryKey: ['comments', postingId],
    queryFn: getComment,
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useQueryOwnPosting = () => {
  const getOwnPosting = async () => {
    const { data } = await axios.get<Posting[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/user/own-posting`
    );
    return data;
  };
  return useQuery<Posting[], Error>({
    queryKey: ['own_postings'],
    queryFn: getOwnPosting,
    onError: (err: any) => {
      console.log(err);
    },
  });
};
