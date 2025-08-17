import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../sidebar/sidebar';
import {Profile} from '../../data/services/profile';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Sidebar
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  profileService = inject(Profile)

  ngOnInit() {
    this.profileService.getMe().subscribe(val => console.log(val));
  }
}
