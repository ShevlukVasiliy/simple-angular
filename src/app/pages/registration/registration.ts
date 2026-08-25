import { Title } from '@angular/platform-browser';
import { Component, OnInit, inject, signal } from '@angular/core';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-registration',
  imports: [BaseLayout, NgClass, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration implements OnInit {
  private pageTitle = inject(Title);
  private toastService = inject(ToastService);

  public error = signal<string>('');
  public form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', [Validators.required]),
  });

  constructor(
    public usersService: UsersService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('Foodie: Регистрация');
  }

  submit() {
    this.error.update(() => '');
    var { username, password, firstName, lastName, middleName } = this.form.getRawValue();
    this.usersService
      .registerUser({ username, password, firstName, lastName, middleName })
      .subscribe({
        next: () => {
          this.toastService.success('Регистрация завершена', 'Теперь вы можете войти в аккаунт.');
          this.router.navigateByUrl('/');
        },
        error: (error: { error: { statusCode: number; message: string } }) => {
          var message = '';
          if (error.error.statusCode === 400) {
            message = 'Проверьте правильность заполненных полей';
          } else if (error.error.statusCode === 409) {
            message = 'Пользователь с таким логином уже существует';
          }

          this.error.update(() => message);
          this.toastService.error('Не удалось зарегистрироваться', message || 'Попробуйте позже.');
        },
      });
  }
}
