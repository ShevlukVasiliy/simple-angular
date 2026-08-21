import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-base-layout',
  imports: [Footer, Header],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {}
