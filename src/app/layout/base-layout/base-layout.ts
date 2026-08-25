import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BottomNotification } from '../../uikit/components/bottom-notification/bottom-notification';

@Component({
  selector: 'app-base-layout',
  imports: [Footer, Header, BottomNotification],
  templateUrl: './base-layout.html',
  styleUrl: './base-layout.css',
})
export class BaseLayout {}
