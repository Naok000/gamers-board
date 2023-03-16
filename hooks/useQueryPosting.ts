// import { useRouter } from 'next/router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Posting } from '@prisma/client';

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
