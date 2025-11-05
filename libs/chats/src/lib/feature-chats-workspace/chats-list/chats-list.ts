import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, WritableSignal} from '@angular/core';
import { ChatsBtn } from '../chats-btn/chats-btn';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from '../../../../../data-access/src/lib/chats/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import {ChatWSMessage} from '../../../../../data-access/src/lib/chats/interfaces/chat-ws-message.interface';
import {isUnreadMessage} from '../../../../../data-access/src/lib/chats/interfaces/type-guards';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtn, FormsModule, ReactiveFormsModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsList {
  chatsService = inject(ChatsService);

  filterChatsControl = new FormControl('');

  chats$ = this.chatsService.getMyChats().pipe(
    switchMap((chats) => {
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes(inputValue!.toLowerCase() ?? '');
          });
        })
      );
    })
  );
}
