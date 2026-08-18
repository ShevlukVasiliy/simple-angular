import { Component, signal } from '@angular/core';
import { PostsService } from '../posts-service';
import { Post } from '../types/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [RouterLink],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  public posts = signal<Post[]>([]);
  public isLoading = signal<boolean>(false);
  public hasError = signal<boolean>(false);

  constructor(public postsService: PostsService) {
    this.getPosts();
  }

  getPosts() {
    this.isLoading.update(() => true);

    this.postsService.getPosts().subscribe({
      next: (val) => {
        this.postsService.savePosts(val);
        this.posts.update(() => Object.values(this.postsService.posts));

        this.hasError.update(() => false);
        this.isLoading.update(() => false);
      },
      error: () => {
        this.hasError.update(() => true);
      },
    });
  }
}
