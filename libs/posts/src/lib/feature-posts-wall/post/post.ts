import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {Comment, PostFeedInput} from '../../ui';
import {AvatarCircle, PostDatePipe, SvgIcon} from '@tt/common-ui';
import {IComment, IPost, PostService} from '@tt/posts';
import {GlobalStoreService} from '@tt/shared';

@Component({
  selector: 'app-post',
  imports: [AvatarCircle, SvgIcon, Comment, PostDatePipe, PostFeedInput],
  templateUrl: './post.html',
  styleUrl: './post.scss',
})
export class Post implements OnInit {
  post = input<IPost>();
  profile = inject(GlobalStoreService).me;
  comments = signal<IComment[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated(commentText: string) {
    firstValueFrom(
      this.postService.createComment({
        text: commentText,
        authorId: this.profile()!.id,
        postId: this.post()!.id,
      })
    )
      .then(async () => {
        const comments = await firstValueFrom(
          this.postService.getCommentsByPostId(this.post()!.id)
        );
        this.comments.set(comments);
      })
      .catch((error) => {
        console.log('Error creating comments', error);
        return;
      });
  }
}
