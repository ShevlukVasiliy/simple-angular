import { Component } from '@angular/core';
import { ResponseService } from './response-service';
import { Response } from './interface/response';

@Component({
  selector: 'app-root',
  providers: [ResponseService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public response: ResponseService) {}
}
