import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-item-list',
  imports: [RouterOutlet],
  templateUrl: './item-list.html',
  styleUrl: './item-list.css',
})
export class ItemList {}
