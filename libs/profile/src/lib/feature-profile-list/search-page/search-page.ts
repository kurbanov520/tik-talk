import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProfileFilters} from '../profile-filters/profile-filters';
import {ProfileCard} from '../../ui/profile-card/profile-card';
import {Store} from '@ngrx/store';
import {profileActions, selectFilteredProfiles} from '../../data';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {Profile} from '@tt/data-access';
import {firstValueFrom, scan, Subject} from 'rxjs';
import {IProfile} from '@tt/interfaces/profile';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters, InfiniteScrollDirective, AsyncPipe],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  store = inject(Store)
  profileService = inject(Profile)
  profiles = this.store.selectSignal(selectFilteredProfiles);
  console = console

  constructor() {}

  timeToFetch() {
    this.store.dispatch(profileActions.setPage({}))
  }
  profilesSubject$ = new Subject<IProfile[]>()

  infiniteProfiles$ = this.profilesSubject$.pipe(
    scan((acc, curr) => {
      return acc.concat(curr) as IProfile[]
    }, [] as IProfile[])
  )

  page = 0

  ngOnInit() {
    this.getNextPage()
  }

  async getNextPage() {
    this.page += 1
    const res = await firstValueFrom(this.profileService.filterProfiles({page: this.page}))

    this.profilesSubject$.next(res.items)
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if(!entries.length) return

    if(entries[0].intersectionRatio > 0) {
      this.timeToFetch()
    }
  }

  onScroll() {
    this.getNextPage()
  }



}
