import { NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { Post } from '../../../interface/posts/get-posts';
import { ToastService } from '../../../services/toast-service';
import { ToggleFavorite } from '../../../store/favorites.model';
import { FavoritesState } from '../../../store/favorites.state';
import { mediaUrl } from '../../../utils/media';

@Component({
  selector: 'app-recipe-card',
  imports: [NgClass, RouterLink],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() mode: 'blue' | 'basic' = 'basic';
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input({ required: true }) recipe!: Post;

  private store = inject(Store);
  private toastService = inject(ToastService);
  private favoriteIds = this.store.selectSignal(FavoritesState.ids);

  get imageUrl(): string {
    return mediaUrl(this.recipe.image);
  }

  isLiked(): boolean {
    return this.favoriteIds().includes(this.recipe.id);
  }

  onLike(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    var wasLiked = this.isLiked();

    this.store.dispatch(new ToggleFavorite(this.recipe));

    if (wasLiked) {
      this.toastService.info('Рецепт удален из понравившихся', this.recipe.title, 3000);
      return;
    }

    this.toastService.success('Рецепт добавлен в понравившиеся', this.recipe.title, 3000);
  }

  printTags(): string {
    var tags = this.recipe.tags;

    if (!tags || tags.length === 0) {
      return '';
    }

    var firstTag = tags[0];
    var count = tags.length - 1;

    if (count === 0) {
      return firstTag;
    }

    return `${firstTag} и еще ${count}`;
  }
}
