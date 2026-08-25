import { Component, OnInit, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { User } from '../../interface/users/get-user';
import { UsersService } from '../../services/users-service';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';
import { ModalService } from '../../services/modal-service';
import { formatDate, formatDateTime } from '../../utils/date';
import { initials, mediaUrl } from '../../utils/media';

export interface UserRecipe {
  id: string;
  title: string;
  createdOn: string;
  image: string;
}

@Component({
  selector: 'app-admin-user',
  imports: [BaseLayout],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.css',
})
export class AdminUser implements OnInit {
  private title = inject(Title);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private postsService = inject(PostsService);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);

  public user = signal<User | null>(null);
  public recipes = signal<UserRecipe[]>([]);
  public isLoading = signal<boolean>(true);

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.isLoading.set(false);
      return;
    }

    this.loadUser(id);
  }

  avatarUrl(avatar: string): string {
    return mediaUrl(avatar);
  }

  imageUrl(image: string): string {
    return mediaUrl(image);
  }

  userInitials(): string {
    var user = this.user();

    return initials(user?.firstName, user?.lastName);
  }

  userName(): string {
    var user = this.user();

    if (!user) {
      return '';
    }

    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  }

  roleName(): string {
    return this.user()?.role === 'admin' ? 'Администратор' : 'Пользователь';
  }

  createdOn(): string {
    var user = this.user();

    return user ? formatDate(user.createdOn) : '';
  }

  lastEntry(): string {
    var user = this.user();

    return user ? formatDateTime(user.lastEntry) : '';
  }

  recipeDate(value: string): string {
    return formatDateTime(value);
  }

  confirmDelete(): void {
    var user = this.user();

    if (!user) {
      return;
    }

    var userId = user.id;

    this.modalService
      .open({
        title: 'Удалить пользователя?',
        content: `Пользователь ${user.username} будет удален без возможности восстановления.`,
        buttons: [
          { label: 'Закрыть', variant: 'secondary', isCancel: true },
          { label: 'Удалить', variant: 'danger', value: 'delete' },
        ],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.deleteUser(userId);
        }
      });
  }

  private deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.toastService.success('Пользователь удален', 'Запись удалена из списка.');
        this.router.navigate(['/admin/users']);
      },
      error: () => {
        this.toastService.error('Не удалось удалить', 'Сервер отклонил запрос на удаление.');
      },
    });
  }

  private loadUser(id: string): void {
    this.isLoading.set(true);

    this.usersService.getUser(id).subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
        this.title.setTitle(`Foodie: ${user.username}`);
        this.loadUserRecipes(user);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Ошибка загрузки', 'Не удалось получить данные пользователя.');
      },
    });
  }

  private loadUserRecipes(user: User): void {
    var userPosts = user.posts ?? [];

    if (userPosts.length === 0) {
      this.recipes.set([]);
      return;
    }

    this.postsService.getPosts().subscribe({
      next: (val) => {
        var allPosts = val ?? [];

        this.recipes.set(
          userPosts.map((post) => ({
            id: post.id,
            title: post.title,
            createdOn: post.createdOn,
            image: allPosts.find((item) => item.id === post.id)?.image ?? '',
          })),
        );
      },
      error: () => {
        this.recipes.set(
          userPosts.map((post) => ({
            id: post.id,
            title: post.title,
            createdOn: post.createdOn,
            image: '',
          })),
        );
      },
    });
  }
}
