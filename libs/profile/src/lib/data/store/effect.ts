import {inject, Injectable} from '@angular/core';
import {Profile} from '@tt/data-access';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {profileActions} from './actions';
import {map, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProfileEffects {
  profileService = inject(Profile)
  actions$ = inject(Actions)

  filterProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents),
      switchMap(({filters}) => {
        return this.profileService.filterProfiles(filters)
      }),
      map(res => profileActions.profilesLoaded({profiles:res.items}))
    )
  })

}
