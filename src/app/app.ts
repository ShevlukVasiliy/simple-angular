import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ResponseService } from './response-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink],
})
export class App {
  constructor(public responseService: ResponseService) {}

  button1Action() {
    this.responseService.getFirstAction().subscribe({
      next: (d) => console.log('First button action:', d),
    });
  }

  button2Action() {
    this.responseService.getSecondAction().subscribe({
      next: (d) => console.log('Second button action:', d),
    });
  }

  button3Action() {
    this.responseService.getThirdAction().subscribe({
      next: (d) => console.log('Third button action:', d),
    });
  }

  button4Action() {
    this.responseService.getFourthAction().subscribe({
      next: (d) => console.log('Fourth button action:', d),
      error: (err) => console.error('Error in button 4 action:', err),
    });
  }

  button5Action() {
    this.responseService.getFifthAction().subscribe({
      next: (d) => console.log('Fifth button action:', d),
    });
  }

  button6Action() {
    this.responseService.getSixthAction().subscribe({
      next: (d) => console.log('Sixth button action:', d),
    });
  }
}
