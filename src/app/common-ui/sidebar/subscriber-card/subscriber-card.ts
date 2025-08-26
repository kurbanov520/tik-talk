import {Component, Input} from '@angular/core';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url-pipe';
import {IProfile} from '../../../data/interfaces/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss'
})
export class SubscriberCard {
  @Input() profile!: IProfile;
}
