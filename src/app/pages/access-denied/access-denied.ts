import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-access-denied',
  imports: [],
  templateUrl: './access-denied.html',
  styleUrl: './access-denied.css',
})
export class AccessDenied {
  constructor(public location: Location) {}
  goBack(event: Event) {
    event.preventDefault();
    this.location.back();
  }
}
