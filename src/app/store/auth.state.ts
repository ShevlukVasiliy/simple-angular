import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { User } from '../interface/users/get-user';

@State<User | null>({
  name: 'auth',
  defaults: null,
})
@Injectable()
export class AuthState {}
