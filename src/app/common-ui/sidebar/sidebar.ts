import {Component, inject} from '@angular/core';
import {SvgIcon} from '../svg-icon/svg-icon';
import {AsyncPipe, JsonPipe, NgForOf} from '@angular/common';
import {SubscriberCard} from './subscriber-card/subscriber-card';
import {RouterLink} from '@angular/router';
import {Profile} from '../../data/services/profile';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIcon,
    NgForOf,
    SubscriberCard,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  profileService = inject(Profile)

  subscribers$ = this.profileService.getSubscribersShortList()

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    }
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
