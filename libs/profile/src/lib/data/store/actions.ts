import {createActionGroup, props} from '@ngrx/store';
import {IProfile} from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'profiles loaded': props<{profiles: IProfile[]}>(),
  }
})
