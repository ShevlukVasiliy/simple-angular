import { Component, signal } from '@angular/core';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-registration',
  imports: [BaseLayout, NgClass, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
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

  submit() {
    this.error.update(() => '');
    var { username, password, firstName, lastName, middleName } = this.form.getRawValue();
    console.log(this.form.getRawValue());
    this.usersService
      .registerUser({ username, password, firstName, lastName, middleName })
      .subscribe({
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
