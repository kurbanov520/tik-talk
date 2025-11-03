import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import { DatePipe } from '@angular/common';
import {AvatarCircle} from '@tt/common-ui';
import { IComment } from '../../../../../data-access/src/lib/posts'

@Component({
  selector: 'app-comment',
  imports: [AvatarCircle, DatePipe],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Comment {
  comment = input<IComment>();
}
