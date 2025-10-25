import {IPost} from '@tt/data-access';
import {createFeature, createReducer, on} from '@ngrx/store';
import {postActions} from './actions';

export interface postState {
  posts: IPost[]
}

export const initialState: postState = {
  posts: [],
}

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,

    on(postActions.fetchPostsSuccess, (state, {posts}) => ({
      ...state,
      posts
    })),


    on(postActions.createPost, (state, {payload}) => ({
        ...state
    })),



  )


})
