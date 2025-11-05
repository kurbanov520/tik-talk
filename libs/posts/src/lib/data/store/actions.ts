import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IComment, IPost} from '@tt/data-access';
import {CommentCreateDto, PostCreateDto} from '../../../../../data-access/src/lib/posts/interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'Fetch Posts': emptyProps(),
    'Fetch Posts Success': props<{posts: IPost[]}>(),

    'Create Post': props<{payload: PostCreateDto}>(),
    'Create Post Success': props<{payload: IPost}>(),
  }


})
