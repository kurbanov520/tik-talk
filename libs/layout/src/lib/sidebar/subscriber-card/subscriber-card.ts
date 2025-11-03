import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ImgUrlPipe} from '@tt/common-ui';
import {IProfile} from '../../../../../interfaces/src/lib/profile/profile.interface';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgUrlPipe],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscriberCard {
  @Input() profile!: IProfile;
}
