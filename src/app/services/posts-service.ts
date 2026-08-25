import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { BASE_API_URL } from '../app';
import { AuthState } from '../store/auth.state';
import { CreatePostBody, CreatePostResponse } from '../interface/posts/create-post';
import { CreateCommentBody, CreateCommentResponse } from '../interface/posts/create-comment';
import { UpdatePostBody, UpdatePostResponse } from '../interface/posts/update-post';
import { GetPost } from '../interface/posts/get-post';
import { GetPostsResponse } from '../interface/posts/get-posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private base = BASE_API_URL;
  private store = inject(Store);

  constructor(public http: HttpClient) {}

  private get token(): string {
    return this.store.selectSnapshot(AuthState.token);
  }

  createPost(body: CreatePostBody): Observable<CreatePostResponse> {
    var url = `${this.base}/api/cooking-blog/posts/create`;
    return this.http.post<CreatePostResponse>(url, body, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  createComment(body: CreateCommentBody, id: string): Observable<CreateCommentResponse> {
    var url = `${this.base}/api/cooking-blog/posts/${id}/add-comment`;
    return this.http.post<CreateCommentResponse>(url, body, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  getPosts(count?: number): Observable<GetPostsResponse> {
    var url = `${this.base}/api/cooking-blog/posts`;
    var queryParams = {};

    if (count) {
      queryParams = new HttpParams({
        fromObject: {
          filter: String(count),
        },
      });
    }

    return this.http.get<GetPostsResponse>(url, {
      params: queryParams,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  getPost(id: string): Observable<GetPost> {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.get<GetPost>(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
  updatePost(id: string, body: UpdatePostBody): Observable<UpdatePostResponse> {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.patch<UpdatePostResponse>(
      url,
      { ...body },
      { headers: { Authorization: `Bearer ${this.token}` } },
    );
  }
  deletePost(id: string): Observable<void> {
    var url = `${this.base}/api/cooking-blog/posts/${id}`;
    return this.http.delete<void>(url, { headers: { Authorization: `Bearer ${this.token}` } });
  }
}
