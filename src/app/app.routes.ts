import { Routes } from '@angular/router';
import { Main } from './main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'item',
    loadChildren: () => import('./page/page-module').then((m) => m.PageModule),
  },
];
