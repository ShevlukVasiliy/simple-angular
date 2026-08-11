import { Injectable } from '@angular/core';
import { Book } from './interface/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public books: Book[] = [
    { bookTitle: 'Первая', author: 'Первый' },
    { bookTitle: 'Вторая', author: 'Второй' },
  ];

  public addBook(bookTitle: Book['bookTitle'], author: Book['author']): void {
    this.books.push({ bookTitle, author });
  }
}
