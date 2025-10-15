import {IProfile} from '@tt/interfaces/profile';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
}

export interface IPost {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: IProfile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: string[];
  comments: IComment[];
}

export interface IComment {
  id: number;
  text: string;
  author: IProfile;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
}
