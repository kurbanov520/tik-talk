import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsList } from '../../../../../../libs/chats/src/lib/feature-chats-workspace/chats-list/chats-list';

@Component({
  selector: 'app-chats',
  imports: [RouterOutlet, ChatsList],
  templateUrl: './chats.html',
  styleUrl: './chats.scss',
})
export class ChatsPageComponent {}
