import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseLayout } from '../../layout/base-layout/base-layout';

@Component({
  selector: 'app-error',
  imports: [BaseLayout, RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorPage {
  private title = inject(Title);

  constructor(public location: Location) {
    this.title.setTitle('Foodie: Страница не найдена');
  }
  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
