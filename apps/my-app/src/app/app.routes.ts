import { Routes } from '@angular/router';
import { LoginPage } from '../../../../libs/auth/src/lib/feature-login/login-page/login-page';
import { Experimental } from './experimental/experimental';
import {canActivateAuth} from '@tt/auth';
import {ProfilePage, SettingsPage} from '@tt/profile';
import {chatsRoutes} from '../../../../libs/chats/src/lib/feature-chats-workspace/chats-page/chatsRoutes';
import {SearchPage} from '../../../../libs/profile/src/lib/feature-profile-list/search-page/search-page';
import {Layout} from '@tt/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePage },
      { path: 'settings', component: SettingsPage },
      { path: 'search', component: SearchPage },
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
