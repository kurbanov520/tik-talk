import {Component, inject} from '@angular/core';
import {PostInput} from '../post-input/post-input';
import {Post} from '../post/post';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-post-feed',
  imports: [
    PostInput,
    Post
  ],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss'
})
export class PostFeed {
  postService = inject(PostService)
  feed = this.postService.posts;

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }
}
