import { Component, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageModule } from './page/page-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule, RouterLink, PageModule, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('simple');
}
