import { Component, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './user-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink],
})
export class App {
  public isAccessed = signal(true);
  public router = inject(Router);

  constructor(public user: UserService) {
    effect(() => {
      this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const regex = /^\/posts\/[^\/]+\/update$/;
          const isMatch = regex.test(event.urlAfterRedirects || event.url);
          if (isMatch) {
            this.isAccessed.update(() => false);
            return;
          }
          this.isAccessed.update(() => true);
        });
    });
  }
}
