import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { Slider } from '../../uikit/components/slider/slider';
import { RecipeCard } from '../../uikit/components/recipe-card/recipe-card';
import { Divider } from '../../uikit/divider/divider';
import { Post } from '../../interface/posts/get-posts';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';

var SLIDER_COUNT = 3;
var BEST_COUNT = 3;
var TASTY_COUNT = 4;

@Component({
  selector: 'app-home',
  imports: [BaseLayout, Slider, RecipeCard, Divider, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private postsService = inject(PostsService);
  private toastService = inject(ToastService);

  public sliderRecipes = signal<Post[]>([]);
  public bestRecipes = signal<Post[]>([]);
  public tastyRecipes = signal<Post[]>([]);
  public isLoading = signal<boolean>(true);
  public canShowMore = signal<boolean>(false);

  private allRecipes: Post[] = [];

  public email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  ngOnInit(): void {
    this.title.setTitle('Foodie: Главная');
    this.meta.addTags([
      { property: 'og:title', content: 'Foodie: Главная' },
      { name: 'twitter:title', content: 'Foodie: Главная' },
      { property: 'og:description', content: 'Сборник кулинарных рецептов, для всей семьи' },
      { name: 'twitter:description', content: 'Сборник кулинарных рецептов, для всей семьи' },
    ]);

    this.loadRecipes();
  }

  subscribe(): void {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }

    this.toastService.success(
      'Вы подписаны на рассылку',
      `Новые рецепты будут приходить на ${this.email.value}`,
    );
    this.email.reset();
  }

  showMore(): void {
    var current = this.bestRecipes();
    var rest = this.allRecipes.filter((recipe) => !current.some((item) => item.id === recipe.id));

    this.bestRecipes.set([...current, ...this.pickRandom(rest, BEST_COUNT)]);
    this.canShowMore.set(false);
  }

  private loadRecipes(): void {
    this.isLoading.set(true);

    this.postsService.getPosts().subscribe({
      next: (val) => {
        var recipes = val ?? [];

        this.allRecipes = recipes;
        this.sliderRecipes.set(recipes.slice(0, SLIDER_COUNT));
        this.bestRecipes.set(this.pickRandom(recipes, BEST_COUNT));
        this.tastyRecipes.set(this.pickRandom(recipes, TASTY_COUNT));
        this.canShowMore.set(recipes.length > BEST_COUNT);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toastService.error('Ошибка загрузки', 'Не удалось получить список рецептов.');
        console.log(err);
      },
    });
  }

  private pickRandom(recipes: Post[], count: number): Post[] {
    var rest = [...recipes];
    var result: Post[] = [];

    while (rest.length > 0 && result.length < count) {
      var index = Math.floor(Math.random() * rest.length);
      result.push(rest.splice(index, 1)[0]);
    }

    return result;
  }
}
