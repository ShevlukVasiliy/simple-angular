import { Routes } from '@angular/router';
import { Posts } from './posts/posts';
import { PostPage } from './post/post';
import { ErrorPage } from './error/error';
import { Home } from './home/home';
import { roleGuard } from './guard-guard';
import { UpdatePost } from './update-post/update-post';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'posts', component: Posts },
  {
    path: 'posts/:id',
    children: [
      { path: '', component: PostPage },
      { path: 'update', component: UpdatePost, canActivate: [roleGuard] },
    ],
  },
  { path: 'error', component: ErrorPage },
];
