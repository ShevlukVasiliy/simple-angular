import { Component } from '@angular/core';
import { Books } from '../books';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  imports: [JsonPipe],
  templateUrl: './book.html',
  styleUrl: './book.css',
})
export class Book {
  booksService = new Books();
}
