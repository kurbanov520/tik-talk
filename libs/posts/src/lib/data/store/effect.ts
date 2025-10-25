import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PostService} from '@tt/data-access';
import {profileActions} from '@tt/profile';
import {postActions} from './actions';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class postEffect {
  postService = inject(PostService);
  actions$ = inject(Actions)

  fetchPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchPosts),
      switchMap(() => {
        return this.postService.fetchPosts()
          .pipe(
            map(res => postActions.fetchPostsSuccess({posts: res}))
          )
      })
    )
  })

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({payload}) => {
        return this.postService.createPost({
          title: payload.title,
          content: payload.content,
          authorId: payload.authorId,
        })
          .pipe(
            map((payload) => postActions.fetchPosts())
          )
      })
    )
  })



}
