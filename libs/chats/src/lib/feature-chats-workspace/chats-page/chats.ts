import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatsList} from '../chats-list/chats-list';
import {ChatsService} from '@tt/data-access';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsList],
  templateUrl: './chats.html',
  styleUrl: './chats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPageComponent {
  #chatService = inject(ChatsService)

  // constructor() {
  //   this.#chatService.connectWs()
  //     .pipe(takeUntilDestroyed())
  //     .subscribe()
  // }
}
