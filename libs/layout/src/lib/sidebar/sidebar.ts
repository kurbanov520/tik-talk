import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, WritableSignal} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {firstValueFrom, Subscription, timer} from 'rxjs';
import {ImgUrlPipe, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/profile';
import {Auth, ChatsService} from '@tt/data-access';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, SubscriberCard, RouterLink, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar implements OnInit {
  profileService = inject(Profile);
  subscribers$ = this.profileService.getSubscribersShortList();
  authService = inject(Auth)
  chatService = inject(ChatsService)
  wsSubscribe!: Subscription;
  destroyRef = inject(DestroyRef);
  unreadMessages: WritableSignal<number> = this.chatService.unreadMessagesCount

  me = this.profileService.me;

  // connectWs() {
  //   this.wsSubscribe?.unsubscribe()
  //   this.wsSubscribe = this.chatService.connectWs()
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(message => {
  //       if (isErrorMessage(message)) {
  //         console.log('Неверный токен')
  //         this.reconnect()
  //       }
  //     })
  // }

 // async reconnect() {
 //      await firstValueFrom(this.profileService.getMe())
 //      await firstValueFrom(timer(2000))
 //       this.connectWs()
 //  }

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());

    this.chatService.connectWs().subscribe()
  }
}
