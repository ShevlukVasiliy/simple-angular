import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  standalone: false,
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  public isOpenBootstrapDemo = false;

  setIsOpenBootstrapDemo() {
    this.isOpenBootstrapDemo = this.isOpenBootstrapDemo ? false : true;
  }
}
