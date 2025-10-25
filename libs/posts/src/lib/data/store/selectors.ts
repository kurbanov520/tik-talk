import {createSelector} from '@ngrx/store';
import {postFeature} from './reducer';
import {IPost} from '@tt/data-access';

export const selectedPosts = createSelector(
  postFeature.selectPosts,
  (posts: IPost[]) => posts
)
