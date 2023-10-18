import { Posting, Thumbnail } from '@prisma/client';

export type posting = {
  id: string;
  title: string;
  content?: string | null;
  imageURL: string;
  thumbnailFileName: string;
};

export type comment = {
  id: string;
  comment: string;
};
export type userComment = {
  id: string;
  user: { userName: string; avatar: { avatarImgURL: string } };
  comment: string;
  timestamp: Date;
};

export type postingById = {
  id: string;
  userId: string;
  gameTitle: string;
  title: string;
  content: string;
  createdAt: Date;
  user: { userName: string; avatar: { avatarImgURL: string } };
  thumbnail: { imageURL: string; thumbnailFileName: string };
  bookMark: { id: string };
};

export interface postingWithImage extends Posting {
  thumbnail: Thumbnail;
}

export type userProfile = {
  id: string;
  userName: string;
  createdAt: Date;
  avatar: { avatarImgURL: string; avatarFileName: string };
};

export type avatar = {
  id: string;
  avatarFileName?: string;
  avatarImgURL: string;
};
