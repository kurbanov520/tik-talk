import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import {IProfile} from '@tt/interfaces/profile';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe, RouterLink],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
