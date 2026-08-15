import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public getTodos() {
    var url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get(url, { responseType: 'json' });
  }
}
