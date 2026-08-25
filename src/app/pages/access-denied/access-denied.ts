import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BaseLayout } from '../../layout/base-layout/base-layout';

@Component({
  selector: 'app-access-denied',
  imports: [BaseLayout, RouterLink],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.css',
})
export class AccessDenied {
  private title = inject(Title);

  constructor(public location: Location) {
    this.title.setTitle('Foodie: Доступ запрещен');
  }
  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
