import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logo } from '../../uikit/logo/logo';
import { initials, mediaUrl } from '../../utils/media';
import { LogoutUser } from '../../store/auth.model';
import { AuthState } from '../../store/auth.state';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Logo],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private store = inject(Store);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  public user = this.store.selectSignal(AuthState.user);
  public isAdmin = this.store.selectSignal(AuthState.isAdmin);
  public isMenuOpen = signal<boolean>(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  }

  get avatarUrl(): string {
    return mediaUrl(this.user()?.avatar);
  }

  get userInitials(): string {
    var user = this.user();

    return initials(user?.firstName, user?.lastName);
  }

  get userName(): string {
    var user = this.user();

    if (!user) {
      return '';
    }

    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  }

  get roleName(): string {
    return this.isAdmin() ? 'Администратор' : 'Пользователь';
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  logout(): void {
    this.isMenuOpen.set(false);
    this.store.dispatch(new LogoutUser());
    this.router.navigateByUrl('/');
  }
}
