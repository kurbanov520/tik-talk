import {inject, Injectable} from '@angular/core';
import {Profile} from '@tt/data-access';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {profileActions} from './actions';
import {map, switchMap, withLatestFrom} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectProfileFilters, selectProfilePageable} from './selectors';

@Injectable({
  providedIn: 'root',
})

export class ProfileEffects {
  profileService = inject(Profile)
  actions$ = inject(Actions)
  store = inject(Store)

  filterProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectProfilePageable),
      ),
      switchMap(([_, filters, pageable]) => {
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters,
        })
      }),
      map(res => profileActions.profilesLoaded({profiles:res.items}))
    )
  })

}
