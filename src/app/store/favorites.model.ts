import { Post } from '../interface/posts/get-posts';

export class ToggleFavorite {
  static readonly type = '[Favorites] Toggle';
  constructor(public payload: Post) {}
}

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public payload: Post) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public id: string) {}
}
