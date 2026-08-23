import { Component, signal } from '@angular/core';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-authorization',
  imports: [BaseLayout, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './authorization.html',
  styleUrl: './authorization.css',
})
export class Authorization {
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

  submit() {
    this.error.update(() => '');
    var { username, password, fastSession } = this.form.getRawValue();
    this.usersService.signUser({ username, password }, fastSession).subscribe({
      next: (val) => {
        console.log('value: ', val);
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
      },
    });
  }
}
