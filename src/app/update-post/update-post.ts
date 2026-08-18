import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../posts-service';
import { Post } from '../types/post';
import { UserService } from '../user-service';

@Component({
  selector: 'app-update-post',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './update-post.html',
  styleUrl: './update-post.css',
})
export class UpdatePost {
  public post = signal<Post | null>(null);
  public isLoading = signal<boolean>(false);
  public hasError = signal<boolean>(false);
  public router = inject(Router);
  public form = new FormGroup<{
    title: FormControl<string | null>;
    body?: FormControl<string | null>;
  }>({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    body: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    public postsService: PostsService,
    public activatedRouter: ActivatedRoute,
    public user: UserService,
  ) {
    this.getPost();

    this.user.accessToChangeRole();
  }

  cancelUpdate() {
    this.router.navigateByUrl('/posts/' + this.post()?.id);
  }

  update() {
    var value = this.form.getRawValue();

    this.postsService
      .updatePost(this.post()?.id as number, {
        title: value['title'] as string,
        body: value['body'] as string,
      })
      .subscribe({
        next: (val) => {
          this.post.update(() => val);
          this.postsService.savePost(val);
          this.hasError.update(() => false);
          this.isLoading.update(() => false);

          this.router.navigateByUrl('/posts/' + this.post()?.id);
        },
        error: () => {
          this.hasError.update(() => true);
        },
      });
  }

  getParams() {
    return Number(this.activatedRouter.snapshot.paramMap.get('id')) || 0;
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
