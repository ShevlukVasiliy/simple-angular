import { Component, signal } from '@angular/core';
import { PostsService } from '../posts-service';
import { Post } from '../types/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../user-service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class PostPage {
  public post = signal<Post | null>(null);
  public isLoading = signal<boolean>(false);
  public hasError = signal<boolean>(false);
  public isEditable = signal<boolean>(false);
  public form = new FormGroup<{
    title: FormControl<string | null>;
    body?: FormControl<string | null>;
  }>({
    title: new FormControl(''),
    body: new FormControl(''),
  });

  constructor(
    public postsService: PostsService,
    public router: ActivatedRoute,
    public user: UserService,
  ) {
    this.getPost();

    this.user.accessToChangeRole();

    this.isEditable.update(() => {
      return this.user.role() === 'admin';
    });
  }

  getParams() {
    return Number(this.router.snapshot.paramMap.get('id')) || 0;
  }

  getPost() {
    var id = this.getParams();
    this.isLoading.update(() => true);

    this.postsService.getPost(id).subscribe({
      next: (val) => {
        this.post.update(() => val);
        this.postsService.savePost(val);

        this.hasError.update(() => false);
        this.isLoading.update(() => false);
        this.form.setValue({ title: val.title, body: val.body });
      },
      error: () => {
        this.hasError.update(() => true);
      },
    });
  }
}
