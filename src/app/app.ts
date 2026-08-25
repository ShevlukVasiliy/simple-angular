import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { Toast } from './uikit/components/toast/toast';
import { AuthState } from './store/auth.state';
import { LogoutUser } from './store/auth.model';
import { ToastService } from './services/toast-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private store = inject(Store);
  private router = inject(Router);
  private toastService = inject(ToastService);

  private user = this.store.selectSignal(AuthState.user);
  private sessionExpiryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      var user = this.user();

      if (this.sessionExpiryTimer) {
        clearTimeout(this.sessionExpiryTimer);
        this.sessionExpiryTimer = null;
      }

      if (!user) {
        return;
      }

      var msLeft = user.expiresIn * 1000 - Date.now();

      if (msLeft <= 0) {
        this.store.dispatch(new LogoutUser());
        return;
      }

      this.sessionExpiryTimer = setTimeout(() => {
        this.store.dispatch(new LogoutUser());
        this.toastService.info(
          'Сессия завершена',
          'Время действия сессии истекло, войдите снова.',
        );
        this.router.navigateByUrl('/');
      }, msLeft);
    });
  }
}

export var BASE_API_URL = 'https://evo-academy.wckz.dev';
