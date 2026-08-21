import { Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BaseLayout } from '../../layout/base-layout/base-layout';

// TODO: заменить на реальные данные из API после Swagger
const MOCK_RECIPE = {
  name: 'Название рецепта',
  description: 'Краткое описание рецепта',
  imageUrl: 'https://placehold.co/600x400',
};

@Component({
  selector: 'app-recipe',
  imports: [BaseLayout],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const recipe = MOCK_RECIPE; // TODO: this.route.snapshot.data['recipe']

    this.title.setTitle(recipe.name);
    this.meta.addTags([
      { property: 'og:title', content: recipe.name },
      { property: 'og:image', content: recipe.imageUrl },
      { property: 'og:description', content: recipe.description },
      { name: 'twitter:description', content: recipe.description },
      { name: 'twitter:title', content: recipe.name },
    ]);
  }
}
