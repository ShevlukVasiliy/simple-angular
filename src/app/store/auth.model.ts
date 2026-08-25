import { SignResponse } from '../interface/users/sign';

export class SignUser {
  static readonly type = '[Auth] Sign';
  constructor(public payload: SignResponse) {}
}

export class LogoutUser {
  static readonly type = '[Auth] Logout';
}
