import { Component, Input, OnChanges, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../interface/posts/get-posts';
import { formatDate } from '../../../utils/date';
import { initials, mediaUrl } from '../../../utils/media';

var SLIDE_INTERVAL = 5000;

@Component({
  selector: 'app-slider',
  imports: [RouterLink],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider implements OnChanges, OnDestroy {
  @Input() recipes: Post[] = [];

  public current = signal<number>(0);

  private timerId: any = null;

  ngOnChanges(): void {
    this.current.set(0);
    this.restartTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  next(): void {
    if (this.recipes.length === 0) {
      return;
    }

    this.current.update((index) => (index + 1) % this.recipes.length);
    this.restartTimer();
  }

  prev(): void {
    if (this.recipes.length === 0) {
      return;
    }

    this.current.update((index) => (index - 1 + this.recipes.length) % this.recipes.length);
    this.restartTimer();
  }

  goTo(index: number): void {
    this.current.set(index);
    this.restartTimer();
  }

  imageUrl(recipe: Post): string {
    return mediaUrl(recipe.image);
  }

  avatarUrl(recipe: Post): string {
    return mediaUrl(recipe.author?.avatar);
  }

  authorInitials(recipe: Post): string {
    return initials(recipe.author?.firstName, recipe.author?.lastName);
  }

  authorName(recipe: Post): string {
    var author = recipe.author;

    if (!author) {
      return '';
    }

    return `${author.firstName ?? ''} ${author.lastName ?? ''}`.trim();
  }

  formatDate(value: string): string {
    return formatDate(value);
  }

  private restartTimer(): void {
    this.stopTimer();

    if (this.recipes.length < 2) {
      return;
    }

    this.timerId = setInterval(() => {
      this.current.update((index) => (index + 1) % this.recipes.length);
    }, SLIDE_INTERVAL);
  }

  private stopTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
