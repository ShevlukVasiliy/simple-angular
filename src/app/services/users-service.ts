import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { RegistrationBody, RegistrationResponseSuccess } from '../interface/users/registration';
import { SignBody, SignResponse } from '../interface/users/sign';
import { CreateUserBody } from '../interface/users/create-user';
import { UpdateUserBody } from '../interface/users/update-user';
import { User } from '../interface/users/get-user';
import { Users } from '../interface/users/get-users';
import { BASE_API_URL } from '../app';
import { AuthState } from '../store/auth.state';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private base = BASE_API_URL;
  private store = inject(Store);

  constructor(public http: HttpClient) {}

  private get token(): string {
    return this.store.selectSnapshot(AuthState.token);
  }

  getUsers(): Observable<Users> {
    var url = `${this.base}/api/cooking-blog/users`;
    return this.http.get<Users>(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  getUser(id: string): Observable<User> {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.get<User>(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  updateUser(id: string, body: UpdateUserBody): Observable<User> {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.patch<User>(
      url,
      { ...body },
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
  }
  deleteUser(id: string): Observable<void> {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.delete<void>(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  createUser(body: CreateUserBody): Observable<User> {
    var url = `${this.base}/api/cooking-blog/users/create`;
    return this.http.post<User>(
      url,
      { ...body, role: 'user', isActive: true },
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
  }
  signUser(body: SignBody, fastSession: boolean): Observable<SignResponse> {
    var url = `${this.base}/api/cooking-blog/users/sign`;
    var queryParams = new HttpParams({
      fromObject: {
        fastJwt: fastSession,
      },
    });
    return this.http.post<SignResponse>(url, body, { params: queryParams });
  }
  registerUser(body: RegistrationBody): Observable<RegistrationResponseSuccess> {
    var url = `${this.base}/api/cooking-blog/users/registration`;
    return this.http.post<RegistrationResponseSuccess>(url, body);
  }
}
