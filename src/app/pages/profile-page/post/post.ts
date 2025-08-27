import {Component, input} from '@angular/core';
import {IPost} from '../../../data/interfaces/post.interface';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post {
  post = input<IPost>();
}
