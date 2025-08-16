import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProfile} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class Profile {

  http = inject(HttpClient)

  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`)
  }
}
