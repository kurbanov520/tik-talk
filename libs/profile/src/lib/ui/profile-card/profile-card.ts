import { Component, Input } from '@angular/core';
import { ImgUrlPipe } from '@tt/common-ui';
import {IProfile} from '@tt/interfaces/profile';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
