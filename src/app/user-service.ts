import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public role = signal<'admin' | 'user'>('user');
  public canChangeRole = signal<boolean>(true);

  public toggleRole() {
    this.role.update((val) => (val === 'user' ? 'admin' : 'user'));
  }
  public accessToChangeRole() {
    this.canChangeRole.update(() => true);
  }
  public denyToChangeRole() {
    this.canChangeRole.update(() => false);
  }
}
