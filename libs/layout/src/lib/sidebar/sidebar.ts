import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import {ImgUrlPipe, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/profile';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, NgForOf, SubscriberCard, RouterLink, AsyncPipe, ImgUrlPipe, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService = inject(Profile);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

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
  }
}
