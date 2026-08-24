import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../uikit/logo/logo';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Logo],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
