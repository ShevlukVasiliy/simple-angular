import { Component, OnInit, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { Post } from '../../interface/posts/get-posts';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';
import { ModalService } from '../../services/modal-service';

@Component({
  selector: 'app-admin-recipes',
  imports: [BaseLayout, RouterLink],
  templateUrl: './admin-recipes.html',
  styleUrl: './admin-recipes.css',
})
export class AdminRecipes implements OnInit {
  private title = inject(Title);
  private postsService = inject(PostsService);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  public recipes = signal<Post[]>([]);
  public isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.title.setTitle('Foodie: Управление рецептами');
    this.loadRecipes();
  }

  shortBody(body: string): string {
    if (!body) {
      return '';
    }

    return body.length > 60 ? `${body.slice(0, 60)}...` : body;
  }

  editRecipe(id: string): void {
    this.router.navigate(['/admin/recipes', id]);
  }

  confirmDelete(recipe: Post): void {
    this.modalService
      .open({
        title: 'Удалить рецепт?',
        content: `Рецепт «${recipe.title}» будет удален без возможности восстановления.`,
        buttons: [
          { label: 'Закрыть', variant: 'secondary', isCancel: true },
          { label: 'Удалить', variant: 'danger', value: 'delete' },
        ],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.deleteRecipe(recipe.id);
        }
      });
  }

  private deleteRecipe(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        this.recipes.update((list) => list.filter((recipe) => recipe.id !== id));
        this.toastService.success('Рецепт удален', 'Запись удалена из списка.');
      },
      error: () => {
        this.toastService.error('Не удалось удалить', 'Сервер отклонил запрос на удаление.');
      },
    });
  }

  private loadRecipes(): void {
    this.isLoading.set(true);

    this.postsService.getPosts().subscribe({
      next: (val) => {
        this.recipes.set(val ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Ошибка загрузки', 'Не удалось получить список рецептов.');
      },
    });
  }
}
