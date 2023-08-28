import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Posting, Thumbnail } from '@prisma/client';

type userComment = {
  id: string;
  user: { userName: string; avatar: { avatarImgURL: string } };
  comment: string;
  timestamp: Date;
};

type postingById = {
  id: string;
  userId: string;
  gameTitle: string;
  title: string;
  content: string;
  createdAt: Date;
  user: { userName: string; avatar: { avatarImgURL: string } };
  thumbnail: { imageURL: string; thumbnailFileName: string };
};

interface postingWithImage extends Posting {
  thumbnail: Thumbnail;
}

export const useQueryPosting = () => {
  const getPosting = async () => {
    const { data } = await axios.get<postingWithImage[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/board`
    );
    return data;
  };
  return useQuery<postingWithImage[], Error>({
    queryKey: ['postings'],
    queryFn: getPosting,
    onError: (err: any) => {
      console.log(err);
    },
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
