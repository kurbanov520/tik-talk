import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProfile} from '../interfaces/profile.interface';
import {map, tap} from 'rxjs';
import {IPageble} from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root'
})
export class Profile {

  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<IProfile | null>(null)

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getSubscribersShortList() {
    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, 3))
      )
  }

  // patchProfile(profile: Partial<IProfile>) {
  //   return this.http.patch(`${this.baseApiUrl}account/me`, profile)
  // }

 }
