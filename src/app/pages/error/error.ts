import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorPage {
  constructor(public location: Location) {}
  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
