import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Foodie: Главная');
    this.meta.addTags([
      { property: 'og:title', content: 'Foodie: Главная' },
      { name: 'twitter:title', content: 'Foodie: Главная' },
      { property: 'og:description', content: 'Сборник кулинарных рецептов, для всей семьи' },
      { name: 'twitter:description', content: 'Сборник кулинарных рецептов, для всей семьи' },
    ]);
  }
}
