import {ChangeDetectionStrategy, Component, effect, inject, signal} from '@angular/core';
import { ProfileHeader } from '../../ui/profile-header/profile-header';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe, NgForOf } from '@angular/common';
import {PostFeed} from '@tt/posts';
import {ImgUrlPipe, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/profile';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, SvgIcon, RouterLink, ImgUrlPipe, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  profileService = inject(Profile);
  route = inject(ActivatedRoute);
  router = inject(Router);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  isMyPage = signal(false);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.profileService.me()!.id);
      if (id === 'me') return this.me$;

      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
      this.router.navigate(['/chats', 'new'], { queryParams: { userId } });
  }
}
