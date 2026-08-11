import { Component } from '@angular/core';
import { BooksService } from './books-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [ReactiveFormsModule],
  styleUrl: './app.css',
})
export class App {
  public form: FormGroup;

  constructor(
    public books: BooksService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      bookTitle: [
        '',
        [Validators.required, Validators.pattern(/^[а-яА-ЯёË]+$/), Validators.minLength(2)],
      ],
      author: [
        '',
        [Validators.required, Validators.pattern(/^[а-яА-ЯёË]+$/), Validators.minLength(2)],
      ],
    });
  }

  submit() {
    const { bookTitle, author } = this.form.value;
    this.books.addBook(bookTitle, author);
    this.form.reset();
  }
}
