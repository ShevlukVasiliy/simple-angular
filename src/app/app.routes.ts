import { Routes } from '@angular/router';
import { responseResolver } from './response-resolver';
import { Seven } from './seven/seven';

export const routes: Routes = [{ path: 'seven', component: Seven, resolve: [responseResolver] }];
