import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  public posts: { [K: string]: Post } = {};
  constructor(public http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    var url = 'https://jsonplaceholder.typicode.com/posts';

    return this.http.get(url, {
      responseType: 'json',
    }) as unknown as Observable<Post[]>;
  }

  getPost(id: number): Observable<Post> {
    var url = 'https://jsonplaceholder.typicode.com/posts/' + id;

    if (this.posts[id]) {
      let data = this.posts[id];
      return of(data);
    }

    return this.http.get(url, {
      responseType: 'json',
    }) as unknown as Observable<Post>;
  }

  savePost(post: Post) {
    this.posts[post.id] = post;
  }

  savePosts(posts: Post[]) {
    for (let post of posts) {
      if (!this.posts[post.id]) {
        this.posts[post.id] = post;
      }
    }
  }

  updatePost(id: number, data: { title: string; body: string }): Observable<Post> {
    var url = 'https://jsonplaceholder.typicode.com/posts/' + id;

    return this.http.patch(url, {
      ...data,
    }) as unknown as Observable<Post>;
  }
}
