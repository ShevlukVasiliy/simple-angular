import { Component } from '@angular/core';
import { ResponseService } from './response-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public response: ResponseService) {}
}
