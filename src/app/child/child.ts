import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  protected count = 0;

  protected increment() {
    this.count += 1;
  }

  protected decrement() {
    this.count -= 1;
  }
}
