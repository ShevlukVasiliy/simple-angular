import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private http: HttpClient) {}
  getFirstAction() {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url);
  }
  getSecondAction() {
    var url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get(url, {
      params: {
        postId: 1,
      },
    });
  }
  getThirdAction() {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.post(url, {});
  }
  getFourthAction() {
    var url = 'https://jsonplaceholder.typicode.com/post';
    return this.http.get(url);
  }
  getFifthAction() {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url, {
      responseType: 'text',
      headers: { 'X-Test': '1' },
    });
  }
  getSixthAction() {
    var url = 'https://jsonplaceholder.typicode.com/posts/1';
    return this.http.delete(url);
  }
  getSeventhAction() {
    var url = 'https://jsonplaceholder.typicode.com/posts/1';
    return this.http.get(url);
  }
}
