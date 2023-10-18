import { deleteObject, ref } from 'firebase/storage';
import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { postingById } from '../../hooks/types/queryType';
import { useMutatePosting } from '../../hooks/useMutatePosting';
import { storage, storageImageFileRef } from '../../lib/firebase';

export const postingInternalFunc = (
  postingId: string | string[] | undefined,
  posting: postingById | undefined,
  resetCommentValue: Dispatch<SetStateAction<string>>,
  resetOpenComments: Dispatch<SetStateAction<boolean>>,
  router: NextRouter
) => {
  const { commentPostingMutation, deletePostingMutation } =
    useMutatePosting(postingId);
  const newComment = async (comment: string) => {
    if (comment?.trim() === '') {
      return;
    }
    try {
      commentPostingMutation.mutate({ comment });
      resetCommentValue('');
      resetOpenComments(false);
    } catch (err) {
      console.error('Faild to post a comment', err);
    }
  };

  const deletePosting = async (id: string) => {
    deletePostingMutation.mutate(id);
    if (
      !ref(
        storage,
        storageImageFileRef + `/default_images/${posting?.gameTitle}.jpg`
      )
    )
      await deleteObject(
        ref(
          storage,
          storageImageFileRef +
            `/images/${posting?.userId}/${posting?.thumbnail.thumbnailFileName}`
        )
      )
        .then(() => {
          console.log('File deleted successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    await router.push('/board');
  };

  return { newComment, deletePosting };
};
