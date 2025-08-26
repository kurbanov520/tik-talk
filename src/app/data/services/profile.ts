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

  getAccount(id: string) {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, subsAmount))
      )
  }

  patchProfile(profile: Partial<IProfile>) {
    console.log('patchprofile до return')
    return this.http.patch<IProfile>(`${this.baseApiUrl}account/me`, profile)
    console.log('patch после return')
  }

 }
