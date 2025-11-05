import {IProfile} from '@tt/interfaces/profile';

export interface IChats {
  id: number;
  userFirst: IProfile;
  userSecond: IProfile;
  messages: IMessage[];
  companion?: IProfile;
}

export interface IMessage {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt?: string;
  user?: IProfile;
  isMine?: boolean;
}

export interface LastMessageRes {
  id: number;
  userFrom: IProfile;
  message: string | null;
}
