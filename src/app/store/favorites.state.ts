import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Post } from '../interface/posts/get-posts';
import { AddFavorite, RemoveFavorite, ToggleFavorite } from './favorites.model';

export type FavoritesStateModel = Post[];

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: [],
})
@Injectable()
export class FavoritesState {
  @Selector()
  static recipes(state: FavoritesStateModel): FavoritesStateModel {
    return state;
  }

  @Selector()
  static ids(state: FavoritesStateModel): string[] {
    return state.map((recipe) => recipe.id);
  }

  @Action(ToggleFavorite)
  toggle(ctx: StateContext<FavoritesStateModel>, action: ToggleFavorite): void {
    var state = ctx.getState();
    var isSaved = state.some((recipe) => recipe.id === action.payload.id);

    if (isSaved) {
      ctx.setState(state.filter((recipe) => recipe.id !== action.payload.id));
      return;
    }

    ctx.setState([...state, action.payload]);
  }

  @Action(AddFavorite)
  add(ctx: StateContext<FavoritesStateModel>, action: AddFavorite): void {
    var state = ctx.getState();

    if (state.some((recipe) => recipe.id === action.payload.id)) {
      return;
    }

    ctx.setState([...state, action.payload]);
  }

  @Action(RemoveFavorite)
  remove(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite): void {
    ctx.setState(ctx.getState().filter((recipe) => recipe.id !== action.id));
  }
}
