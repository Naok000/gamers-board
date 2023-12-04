import { useRouter } from 'next/router';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { toastSummary } from '../toastSummary';

export const bookMarkFunc = () => {
  const { bookMarkAddMutation, removeBookMarkMutation } = useMutatePosting();
  const { addBookMarkToast, removeBookMarkToast } = toastSummary();
  const router = useRouter();

  const addBookMark = async (postingId: string | string[] | undefined) => {
    try {
      bookMarkAddMutation.mutate(postingId);
      addBookMarkToast();
      router.reload();
    } catch (err) {
      console.error('Failed to add Book Mark', err);
    }
  };

  const removeBookMark = async (postingId: string | string[] | undefined) => {
    try {
      removeBookMarkMutation.mutate(postingId);
      removeBookMarkToast();
      router.reload();
    } catch (err) {
      console.error('Failed to remove Book Mark', err);
    }
  };

  return { addBookMark, removeBookMark };
};
