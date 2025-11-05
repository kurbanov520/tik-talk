import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {AvatarCircle} from '@tt/common-ui';
import {LastMessageRes} from '../../../../../data-access/src/lib/chats/interfaces/chats.interface';

@Component({
  selector: 'button[chats]',
  imports: [AvatarCircle],
  templateUrl: './chats-btn.html',
  styleUrl: './chats-btn.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsBtn {
  chat = input<LastMessageRes>();
}
