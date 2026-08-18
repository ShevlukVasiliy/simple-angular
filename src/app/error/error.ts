import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class ErrorPage {
  constructor(public userService: UserService) {}
}
