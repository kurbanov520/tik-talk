import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IProfile} from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'set page': props<{page?: number}>(),
    'profiles loaded': props<{profiles: IProfile[]}>(),
  }
})
