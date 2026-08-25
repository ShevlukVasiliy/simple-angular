import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { GetPost } from '../../interface/posts/get-post';
import { Post } from '../../interface/posts/get-posts';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';
import { ModalService } from '../../services/modal-service';
import { RecipeCard } from '../../uikit/components/recipe-card/recipe-card';
import { FoodValue } from '../../uikit/components/food-value/food-value';
import { Comment } from '../../uikit/components/comment/comment';
import { ToggleFavorite } from '../../store/favorites.model';
import { FavoritesState } from '../../store/favorites.state';
import { formatDate } from '../../utils/date';
import { initials, mediaUrl } from '../../utils/media';

var OTHER_COUNT = 3;
var MAY_LIKE_COUNT = 4;

@Component({
  selector: 'app-recipe',
  imports: [BaseLayout, RouterLink, ReactiveFormsModule, RecipeCard, FoodValue, Comment],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class Recipe implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private toastService = inject(ToastService);
  private modalService = inject(ModalService);
  private store = inject(Store);

  public recipe = signal<GetPost | null>(null);
  public otherRecipes = signal<Post[]>([]);
  public mayLikeRecipes = signal<Post[]>([]);
  public isLoading = signal<boolean>(true);
  public checkedIngredients = signal<number[]>([]);
  public checkedSteps = signal<number[]>([]);
  public isCommentSending = signal<boolean>(false);

  public comment = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  private favoriteIds = this.store.selectSignal(FavoritesState.ids);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');

      if (!id) {
        return;
      }

      this.checkedIngredients.set([]);
      this.checkedSteps.set([]);
      this.loadRecipe(id);
      this.loadSuggestions(id);
    });
  }

  imageUrl(image: string): string {
    return mediaUrl(image);
  }

  authorInitials(): string {
    var author = this.recipe()?.author;

    return initials(author?.firstName, author?.lastName);
  }

  authorName(): string {
    var author = this.recipe()?.author;

    if (!author) {
      return '';
    }

    return `${author.firstName ?? ''} ${author.lastName ?? ''}`.trim();
  }

  createdOn(): string {
    var recipe = this.recipe();

    return recipe ? formatDate(recipe.createdOn) : '';
  }

  isFavorite(): boolean {
    var recipe = this.recipe();

    return !!recipe && this.favoriteIds().includes(recipe.id);
  }

  toggleFavorite(): void {
    var recipe = this.recipe();

    if (!recipe) {
      return;
    }

    var wasSaved = this.isFavorite();

    this.store.dispatch(new ToggleFavorite(recipe as unknown as Post));

    if (wasSaved) {
      this.toastService.info('Рецепт удален из избранного', recipe.title, 3000);
      return;
    }

    this.toastService.success('Рецепт добавлен в избранное', recipe.title, 3000);
  }

  toggleIngredient(index: number): void {
    this.checkedIngredients.update((list) =>
      list.includes(index) ? list.filter((item) => item !== index) : [...list, index],
    );
  }

  toggleStep(index: number): void {
    this.checkedSteps.update((list) =>
      list.includes(index) ? list.filter((item) => item !== index) : [...list, index],
    );
  }

  print(): void {
    window.print();
  }

  share(): void {
    var recipe = this.recipe();

    this.modalService.open({
      title: 'Поделиться этим рецептом',
      content: recipe?.title,
      buttons: [
        { label: 'ВКонтакте', variant: 'secondary' },
        { label: 'Telegram', variant: 'secondary' },
        { label: 'WhatsApp', variant: 'secondary' },
        { label: 'Скопировать ссылку', variant: 'primary' },
        { label: 'Закрыть', variant: 'secondary', isCancel: true },
      ],
    });
  }

  sendComment(): void {
    var recipe = this.recipe();

    if (this.comment.invalid || !recipe) {
      this.comment.markAsTouched();
      return;
    }

    var recipeId = recipe.id;

    this.isCommentSending.set(true);

    this.postsService.createComment({ text: this.comment.value }, recipeId).subscribe({
      next: () => {
        this.isCommentSending.set(false);
        this.comment.reset();
        this.toastService.success('Комментарий добавлен', 'Спасибо за ваш отзыв!');
        this.loadRecipe(recipeId);
      },
      error: (err: HttpErrorResponse) => {
        this.isCommentSending.set(false);

        if (err.status === 401 || err.status === 403) {
          this.toastService.error(
            'Требуется авторизация',
            'Войдите в аккаунт, чтобы оставить комментарий.',
          );
          return;
        }

        this.toastService.error('Не удалось отправить комментарий', 'Попробуйте позже.');
      },
    });
  }

  private loadRecipe(id: string): void {
    this.isLoading.set(true);

    this.postsService.getPost(id).subscribe({
      next: (recipe) => {
        this.recipe.set(recipe);
        this.isLoading.set(false);
        this.setMetaTags(recipe);
      },
      error: () => {
        this.isLoading.set(false);
        this.toastService.error('Ошибка загрузки', 'Не удалось получить рецепт.');
      },
    });
  }

  private loadSuggestions(currentId: string): void {
    this.postsService.getPosts().subscribe({
      next: (val) => {
        var recipes = (val ?? []).filter((item) => item.id !== currentId);

        this.otherRecipes.set(this.pickRandom(recipes, OTHER_COUNT));
        this.mayLikeRecipes.set(this.pickRandom(recipes, MAY_LIKE_COUNT));
      },
      error: () => {
        this.otherRecipes.set([]);
        this.mayLikeRecipes.set([]);
      },
    });
  }

  private setMetaTags(recipe: GetPost): void {
    var description = (recipe.body ?? '').slice(0, 160);

    this.title.setTitle(recipe.title);
    this.meta.addTags([
      { property: 'og:title', content: recipe.title },
      { name: 'twitter:title', content: recipe.title },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },
      { property: 'og:image', content: this.imageUrl(recipe.image) },
    ]);
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
