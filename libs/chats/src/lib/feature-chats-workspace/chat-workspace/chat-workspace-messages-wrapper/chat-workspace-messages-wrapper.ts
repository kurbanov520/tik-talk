import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessage } from './chat-workspace-message/chat-workspace-message';
import { MessageInput } from '../../../ui/message-input/message-input';
import { ChatsService } from '../../../../../../data-access/src/lib/chats/services/chats.service';
import { IChats } from '../../../../../../data-access/src/lib/chats/interfaces/chats.interface';
import { firstValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessage, MessageInput],
  templateUrl: './chat-workspace-messages-wrapper.html',
  styleUrl: './chat-workspace-messages-wrapper.scss',
})
export class ChatWorkspaceMessagesWrapper {
  chatsService = inject(ChatsService);
  chat = input.required<IChats>();
  messages = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {

    this.chatsService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )

    // await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText));

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
