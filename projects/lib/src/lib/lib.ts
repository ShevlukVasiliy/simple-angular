import { Component } from '@angular/core';

@Component({
  selector: 'lib-lib',
  imports: [],
  templateUrl: './lib.html',
  styles: `
    table {
      background: #ffc;
      width: 400px;
    }
    td {
      border: 1px solid #333;
    }
    th {
      border: 2px solid #333;
      background: #fff;
    }
  `,
})
export class Lib {}
