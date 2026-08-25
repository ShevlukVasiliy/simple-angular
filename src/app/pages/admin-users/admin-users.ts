import { Component, OnInit, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { Users } from '../../interface/users/get-users';
import { UsersService } from '../../services/users-service';
import { ToastService } from '../../services/toast-service';
import { ModalService } from '../../services/modal-service';
import { initials, mediaUrl } from '../../utils/media';

@Component({
  selector: 'app-admin-users',
  imports: [BaseLayout, RouterLink],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers implements OnInit {
  private title = inject(Title);
  private usersService = inject(UsersService);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private router = inject(Router);

  public users = signal<Users>([]);
  public isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.title.setTitle('Foodie: Управление пользователями');
    this.loadUsers();
  }

  avatarUrl(avatar: string): string {
    return mediaUrl(avatar);
  }

  userInitials(firstName: string, lastName: string): string {
    return initials(firstName, lastName);
  }

  roleName(role: string): string {
    return role === 'admin' ? 'Администратор' : 'Пользователь';
  }

  openUser(id: string): void {
    this.router.navigate(['/admin/users', id]);
  }

  confirmDelete(id: string, name: string): void {
    this.modalService
      .open({
        title: 'Удалить пользователя?',
        content: `Пользователь ${name} будет удален без возможности восстановления.`,
        buttons: [
          { label: 'Закрыть', variant: 'secondary', isCancel: true },
          { label: 'Удалить', variant: 'danger', value: 'delete' },
        ],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.deleteUser(id);
        }
      });
  }

  private deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.users.update((list) => list.filter((user) => user.id !== id));
        this.toastService.success('Пользователь удален', 'Запись удалена из списка.');
      },
      error: () => {
        this.toastService.error('Не удалось удалить', 'Сервер отклонил запрос на удаление.');
      },
    });
  }

  private loadUsers(): void {
    this.isLoading.set(true);

    this.usersService.getUsers().subscribe({
      next: (val) => {
        this.users.set(val ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Ошибка загрузки', 'Не удалось получить список пользователей.');
      },
    });
  }
}
