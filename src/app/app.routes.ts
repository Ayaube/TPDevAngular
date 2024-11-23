import { Routes } from '@angular/router';
import { PageUtilisateursComponent } from './user-list/page/user-page.component';
import {DonneesSatisfactionComponent } from './satisfaction-data/satisfaction-data.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: PageUtilisateursComponent,
  },
  {
    path: 'satisfaction',
    component: DonneesSatisfactionComponent,
  },
];
