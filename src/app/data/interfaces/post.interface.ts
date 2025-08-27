import {IProfile} from './profile.interface';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
}

export interface IPost {
  id: number,
  title: string,
  communityId: number,
  content: string,
  author: IProfile,
  images: string[],
  createdAt: string,
  updatedAt: string,
  likes: number,
  likesUsers: string[],
  comments: Comment[]
}

export interface Comment {
  id: number,
  text: string,
  author: IProfile,
  postId: number,
  commentId: number,
  createdAt: string,
  updatedAt: string,
}
