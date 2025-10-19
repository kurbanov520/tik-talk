import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { Post } from '../post/post';
import { PostFeedInput } from '../../ui/post-feed-input/post-feed-input';
import { PostService } from '../../../../../data-access/src/lib/posts/services/post.service';
import {GlobalStoreService} from '@tt/shared';

@Component({
  selector: 'app-post-feed',
  imports: [Post, PostFeedInput],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss',
})
export class PostFeed {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;

  feed = this.postService.posts;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(1000))
      .subscribe(() => console.log(123));
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  createdPost(text: string) {
    if (!text) return;

    if (text) {
      firstValueFrom(
        this.postService.createPost({
          title: 'Клевый пост',
          content: text,
          authorId: this.profile()!.id,
        })
      );
    }
  }
}
