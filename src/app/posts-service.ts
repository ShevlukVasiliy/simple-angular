import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from './app';
import { CreatePostBody } from './interface/posts/create-post';
import { CreateCommentBody } from './interface/posts/create-comment';
import { UpdatePostBody } from './interface/posts/update-post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private base = BASE_API_URL;
  private token: string | null = null;
  constructor(public http: HttpClient) {
    this.token = ''; // TODO change to store data
  }

  createPost(body: CreatePostBody) {
    var url = `${this.base}/api/cooking-blog/posts/create`;
    return this.http.post(url, { ...body, headers: { Authorization: `Bearer ${this.token}` } });
  }
  createComment(body: CreateCommentBody, id: string) {
    var url = `${this.base}/api/cooking-blog/posts/${id}/add-comment`;
    return this.http.post(url, { ...body, headers: { Authorization: `Bearer ${this.token}` } });
  }
  getPosts(count?: number) {
    var url = `${this.base}/api/cooking-blog/posts`;
    var queryParams = new HttpParams({
      fromObject: {
        filter: String(count),
      },
    });

    return this.http.get(url, {
      params: queryParams,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  getPost(id: string) {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.get(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  updatePost(id: string, body: UpdatePostBody) {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.patch(url, { ...body, headers: { Authorization: `Bearer ${this.token}` } });
  }
  deletePost(id: string) {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.delete(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
}
