import {createFeature, createReducer, on} from '@ngrx/store';
import {profileActions} from './actions';
import {IProfile} from '@tt/interfaces/profile';

export interface ProfileState {
  profiles: IProfile[],
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles,
      }
    })
  )
})
