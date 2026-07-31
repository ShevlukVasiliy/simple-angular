import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [RouterOutlet],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item {}
