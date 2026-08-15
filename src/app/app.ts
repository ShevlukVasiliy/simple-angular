import { Component, OnInit, signal } from '@angular/core';
import { RequestService } from './request-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  public response = signal<Object>({});

  constructor(public requestService: RequestService) {}

  ngOnInit() {
    this.requestService.getTodos().subscribe({
      next: (res) => {
        console.log('get todos: ', res);
        this.response.update(() => res);
      },
      error: (err: unknown) => {
        if (err instanceof Error) {
          console.error('request failed with error: ', err);
        }
      },
    });
  }

  checkLength() {
    return Object.keys(this.response()).length;
  }
}
