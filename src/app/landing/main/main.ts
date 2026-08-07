import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.html',
  styleUrl: './main.css',
  host: { class: 'flex flex-1 flex-col min-h-0' },
})
export class Main {}
