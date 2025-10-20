import { Component, inject, signal } from '@angular/core';
import { ProfileFilters } from '../profile-filters/profile-filters';
import { ProfileCard } from '../../ui/profile-card/profile-card';
import {Store} from '@ngrx/store';
import {selectFilteredProfiles} from '../../data';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  store = inject(Store)

  profiles = this.store.selectSignal(selectFilteredProfiles);


}
