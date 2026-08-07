import { Component } from '@angular/core';
import { LandingModule } from './landing/landing-module';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [LandingModule],
  providers: [CookieService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
