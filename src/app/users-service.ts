import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationBody } from './interface/users/registration';
import { SignBody } from './interface/users/sign';
import { CreateUserBody } from './interface/users/create-user';
import { UpdateUserBody } from './interface/users/update-user';
import { BASE_API_URL } from './app';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private base = BASE_API_URL;
  private token: string | null = null;
  constructor(public http: HttpClient) {
    this.token = ''; // TODO change to store data
  }

  getUsers() {
    var url = `${this.base}/api/cooking-blog/users`;
    return this.http.get(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  getUser(id: string) {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.get(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  updateUser(id: string, body: UpdateUserBody) {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.patch(url, { ...body, headers: { Authorization: `Bearer ${this.token}` } });
  }
  deleteUser(id: string) {
    var url = `${this.base}/api/cooking-blog/users/${id}`;
    return this.http.delete(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  createUser(body: CreateUserBody) {
    var url = `${this.base}/api/cooking-blog/users/create`;
    return this.http.post(url, { ...body, headers: { Authorization: `Bearer ${this.token}` } });
  }
  signUser(body: SignBody) {
    var url = `${this.base}/api/cooking-blog/users/sign`;
    var queryParams = new HttpParams({
      fromObject: {
        fastJwt: true,
      },
    });
    return this.http.post(url, { ...body, params: queryParams });
  }
  registerUser(body: RegistrationBody) {
    var url = `${this.base}/api/cooking-blog/users/registration`;
    return this.http.post(url, body);
  }
}
