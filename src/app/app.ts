import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { PlusFivePipe } from './plus-five-pipe';

@Component({
  selector: 'app-root',
  imports: [DatePipe, PlusFivePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected array = ['row 1', 'row 2', 'row 3', 'row 4'];
  protected number = 123;
  protected date = new Date();
}
