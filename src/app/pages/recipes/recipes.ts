import { Component, inject, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { GetPostsResponse } from '../../interface/posts/get-posts';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';
import { RecipeCard } from '../../uikit/components/recipe-card/recipe-card';

@Component({
  selector: 'app-recipes',
  imports: [BaseLayout, RecipeCard],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  private title = inject(Title);
  private meta = inject(Meta);
  private toastService = inject(ToastService);
  public recipes = signal<GetPostsResponse>([]);
  public postsService = inject(PostsService);

  ngOnInit(): void {
    this.title.setTitle('Foodie: Каталог рецептов');
    this.meta.addTags([
      { property: 'og:title', content: 'Foodie: Каталог рецептов' },
      { name: 'twitter:title', content: 'Foodie: Каталог рецептов' },
      { property: 'og:description', content: 'Все самые лучшие рецепты собраны здесь' },
      { name: 'twitter:description', content: 'Все самые лучшие рецепты собраны здесь' },
    ]);

    this.postsService.getPosts().subscribe({
      next: (val) => {
        this.recipes.update(() => val);
      },
      error: () => {
        this.notifyAboutError();
      },
    });
  }

  notifyAboutError() {
    this.toastService.error('Ошибка загрузки', 'Не удалось получить список рецептов.');
  }
}
