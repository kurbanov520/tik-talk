import {Component, input} from '@angular/core';
import {AvatarCircle} from '../../../../common-ui/avatar-circle/avatar-circle';
import {IComment} from '../../../../data/interfaces/post.interface';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [
    AvatarCircle,
    DatePipe
  ],
  templateUrl: './comment.html',
  styleUrl: './comment.scss'
})
export class Comment {
  comment = input<IComment>()
}
