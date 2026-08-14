import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-seven',
  imports: [JsonPipe],
  templateUrl: './seven.html',
  styleUrl: './seven.css',
})
export class Seven {
  public response: null | Data = null;

  constructor(route: ActivatedRoute) {
    route.data.subscribe((d) => {
      this.response = d;
    });
  }
}
