import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Recipe } from './pages/recipe/recipe';
import { Recipes } from './pages/recipes/recipes';
import { Authorization } from './pages/authorization/authorization';
import { Registration } from './pages/registration/registration';
import { CreateRecipe } from './pages/create-recipe/create-recipe';
import { AccessDenied } from './pages/access-denied/access-denied';
import { ErrorPage } from './pages/error/error';
import { AdminUsers } from './pages/admin-users/admin-users';
import { AdminUser } from './pages/admin-user/admin-user';
import { AdminRecipes } from './pages/admin-recipes/admin-recipes';
import { EditRecipe } from './pages/edit-recipe/edit-recipe';
import { adminGuard, authGuard, guestGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'recipes', component: Recipes },
  { path: 'recipes/:id', component: Recipe },
  { path: 'authorization', component: Authorization, canActivate: [guestGuard] },
  { path: 'registration', component: Registration, canActivate: [guestGuard] },
  { path: 'create-recipe', component: CreateRecipe, canActivate: [authGuard] },
  { path: 'access-denied', component: AccessDenied },

  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AdminUsers },
      { path: 'users/:id', component: AdminUser },
      { path: 'recipes', component: AdminRecipes },
      { path: 'recipes/:id', component: EditRecipe },
    ],
  },

  { path: '**', component: ErrorPage },
];
