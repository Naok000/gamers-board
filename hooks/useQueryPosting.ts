import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Posting } from '@prisma/client';
import { COMMENT, OWN_POSTING, POSTING } from '../consts/queryKey';
import { postingById, postingWithImage, userComment } from './types/queryType';

const errorLog = (err: any) => {
  console.log(err);
};

export const useQueryPosting = () => {
  const getPosting = async () => {
    const { data } = await axios.get<postingWithImage[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/board`
    );
    return data;
  };
  return useQuery<postingWithImage[], Error>({
    queryKey: [POSTING],
    queryFn: getPosting,
    keepPreviousData: true,
    onError: errorLog,
  });
};

export const useQueryPostingId = (postingId: string | string[] | undefined) => {
  const getPostingId = async () => {
    const { data } = await axios.get<postingById>(
      `${process.env.NEXT_PUBLIC_API_URL}/board/${postingId}`
    );
    return data;
  };
  return useQuery<postingById, Error>({
    queryKey: [POSTING, postingId],
    queryFn: getPostingId,
    enabled: !!postingId,
    onError: errorLog,
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
    queryKey: [COMMENT, postingId],
    queryFn: getComment,
    enabled: !!postingId,
    keepPreviousData: true,
    onError: errorLog,
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
    queryKey: [OWN_POSTING],
    queryFn: getOwnPosting,
    onError: errorLog,
  });
};
