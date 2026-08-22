import { Component } from '@angular/core';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [BaseLayout, NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './authorization.html',
  styleUrl: './authorization.css',
})
export class Authorization {
  public form: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    fastSession: new FormControl(false),
  });

  submit() {
    console.log(this.form.getRawValue());
  }
}
