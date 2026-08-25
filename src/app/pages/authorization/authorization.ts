import { Title } from '@angular/platform-browser';
import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { UsersService } from '../../services/users-service';
import { ToastService } from '../../services/toast-service';
import { SignUser } from '../../store/auth.model';

@Component({
  selector: 'app-authorization',
  imports: [BaseLayout, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './authorization.html',
  styleUrl: './authorization.css',
})
export class Authorization implements OnInit {
  private pageTitle = inject(Title);
  private store = inject(Store);
  private toastService = inject(ToastService);

  public error = signal<string>('');
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fastSession: new FormControl(false),
  });

  constructor(
    public usersService: UsersService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('Foodie: Авторизация');
  }

  submit() {
    this.error.update(() => '');
    var { username, password, fastSession } = this.form.getRawValue();
    this.usersService.signUser({ username, password }, fastSession).subscribe({
      next: (val) => {
        this.store.dispatch(new SignUser(val));
        this.toastService.success('Вы вошли в аккаунт', 'Добро пожаловать в Foodie!');
        this.router.navigateByUrl('/');
      },
      error: (error: { error: { statusCode: number; message: string } }) => {
        var message = '';
        if (error.error.statusCode === 401) {
          message = 'Не верный парль';
        } else if (error.error.statusCode === 403) {
          message = 'Пользователь заблокирован';
        } else if (error.error.statusCode === 404) {
          message = 'Пользователь не найден';
        }

        this.error.update(() => message);
        this.toastService.error('Не удалось войти', message || 'Проверьте введенные данные.');
      },
    });
  }
}
