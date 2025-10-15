import { Component, inject, signal } from '@angular/core';
import { ProfileCard } from '../../../../../../libs/profile/src/lib/ui/profile-card/profile-card';
import { ProfileFilters } from '../profile-filters/profile-filters';
import {Profile} from '@tt/profile';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileFilters],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  protected readonly title = signal('my-app');

  profile = inject(Profile);
  profiles = this.profile.filteredProfiles;
}
