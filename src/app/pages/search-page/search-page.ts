import {Component, inject, signal} from '@angular/core';
import {ProfileCard} from '../../common-ui/profile-card/profile-card';
import {Profile} from '../../data/services/profile';
import {IProfile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCard
  ],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
  protected readonly title = signal('my-app');

  profile = inject(Profile)
  profiles: IProfile[] = []

  constructor() {
    this.profile.getTestAccounts().subscribe( val => {
      this.profiles = val
    })
  }
}
