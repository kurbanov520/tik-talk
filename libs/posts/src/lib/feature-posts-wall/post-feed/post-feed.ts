import {ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Renderer2, signal} from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { Post } from '../post/post';
import { PostFeedInput } from '../../ui/post-feed-input/post-feed-input';
import { PostService } from '../../../../../data-access/src/lib/posts/services/post.service';
import {GlobalStoreService} from '@tt/shared';
import {Store} from '@ngrx/store';
import {postActions, selectedPosts} from '@tt/posts';

@Component({
  selector: 'app-post-feed',
  imports: [Post, PostFeedInput],
  templateUrl: './post-feed.html',
  styleUrl: './post-feed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeed {
  store = inject(Store)
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;

  feed = this.store.selectSignal(selectedPosts)

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  ngOnInit() {
    this.store.dispatch(postActions.fetchPosts())
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
        this.store.dispatch(postActions.createPost({
          payload: {
            title: 'Клевый пост',
            content: text,
            authorId: this.profile()!.id,
          }
        }))
    }
  }


}
