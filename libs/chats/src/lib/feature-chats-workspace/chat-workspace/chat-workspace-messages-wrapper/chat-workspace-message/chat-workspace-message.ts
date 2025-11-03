import {ChangeDetectionStrategy, Component, HostBinding, input} from '@angular/core';
import { IMessage } from '../../../../../../../data-access/src/lib/chats/interfaces/chats.interface';
import { DatePipe } from '@angular/common';
import {AvatarCircle} from '@tt/common-ui';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircle, DatePipe],
  templateUrl: './chat-workspace-message.html',
  styleUrl: './chat-workspace-message.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceMessage {
  message = input.required<IMessage>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
