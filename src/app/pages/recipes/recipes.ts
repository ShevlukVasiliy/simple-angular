import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Foodie: Каталог рецептов');
    this.meta.addTags([
      { property: 'og:title', content: 'Foodie: Каталог рецептов' },
      { name: 'twitter:title', content: 'Foodie: Каталог рецептов' },
      { property: 'og:description', content: 'Все самые лучшие рецепты собраны здесь' },
      { name: 'twitter:description', content: 'Все самые лучшие рецепты собраны здесь' },
    ]);
  }
}
