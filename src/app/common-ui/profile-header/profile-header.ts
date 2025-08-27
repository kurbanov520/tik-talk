import {Component, input} from '@angular/core';
import {IProfile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url-pipe';
import {AvatarCircle} from '../avatar-circle/avatar-circle';

@Component({
  selector: 'app-profile-header',
  imports: [
    AvatarCircle
  ],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss'
})
export class ProfileHeader {
  profile = input<IProfile>()
}
