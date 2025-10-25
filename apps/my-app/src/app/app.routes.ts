import { Routes } from '@angular/router';
import { LoginPage } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page';
import { Experimental } from './experimental/experimental';
import {canActivateAuth} from '@tt/auth';
import {ProfileEffects, profileFeature, ProfilePage, SettingsPage} from '@tt/profile';
import {chatsRoutes} from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chatsRoutes';
import {SearchPage} from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page';
import {Layout} from '@tt/layout';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {postEffect, postFeature} from '@tt/posts';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'profile/:id', component: ProfilePage,
        providers: [
          provideState(postFeature),
          provideEffects(postEffect)
        ]
      },
      { path: 'settings', component: SettingsPage },
      {
        path: 'search',
        component: SearchPage,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      { path: 'experimental', component: Experimental },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
    canActivate: [canActivateAuth],
  },
  {
    path: 'login',
    component: LoginPage,
  },
];
