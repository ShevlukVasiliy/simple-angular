import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SignResponse } from '../interface/users/sign';
import { LogoutUser, SignUser } from './auth.model';

export type AuthStateModel = SignResponse | null;

@State<AuthStateModel>({
  name: 'auth',
  defaults: null,
})
@Injectable()
export class AuthState {
  @Selector()
  static user(state: AuthStateModel): AuthStateModel {
    return state;
  }

  @Selector()
  static token(state: AuthStateModel): string {
    return state?.jwtToken ?? '';
  }

  @Selector()
  static isAuthorized(state: AuthStateModel): boolean {
    return !!state?.jwtToken;
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state?.role === 'admin';
  }

  @Action(SignUser)
  sign(ctx: StateContext<AuthStateModel>, action: SignUser): void {
    ctx.setState(action.payload);
  }

  @Action(LogoutUser)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState(null);
  }
}
