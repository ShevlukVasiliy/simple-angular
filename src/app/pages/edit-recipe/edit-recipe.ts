import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { Divider } from '../../uikit/divider/divider';
import { PostsService } from '../../services/posts-service';
import { UpdatePostBody } from '../../interface/posts/update-post';
import { GetPost } from '../../interface/posts/get-post';

export interface StepForm {
  stepAction: FormControl<string>;
  stepDescription: FormControl<string>;
}

export interface IngredientForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

export interface ToastInfo {
  title: string;
  description: string;
}

@Component({
  selector: 'app-edit-recipe',
  imports: [BaseLayout, Divider, ReactiveFormsModule],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.css',
})
export class EditRecipe implements OnInit {
  private postsService = inject(PostsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public toast = signal<ToastInfo | null>(null);
  public isSubmitting = signal<boolean>(false);
  public isLoading = signal<boolean>(true);

  private postId: string | null = null;
  private toastTimeoutId: any = null;

  public form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    cookingTime: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    proteins: new FormControl<number | null>(null, [Validators.min(0)]),
    fats: new FormControl<number | null>(null, [Validators.min(0)]),
    carbs: new FormControl<number | null>(null, [Validators.min(0)]),
    calories: new FormControl<number | null>(null, [Validators.min(0)]),

    steps: new FormArray<FormGroup<StepForm>>([]),
    ingredients: new FormArray<FormGroup<IngredientForm>>([]),
  });

  public get steps(): FormArray<FormGroup<StepForm>> {
    return this.form.controls.steps;
  }

  public get ingredients(): FormArray<FormGroup<IngredientForm>> {
    return this.form.controls.ingredients;
  }

  public ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.loadRecipeData(this.postId);
    } else {
      this.isLoading.set(false);
      this.showToast('Ошибка', 'Идентификатор рецепта не найден в адресе URL.');
    }
  }

  private loadRecipeData(id: string): void {
    this.isLoading.set(true);
    this.postsService.getPost(id).subscribe({
      next: (recipe) => {
        this.populateForm(recipe as GetPost);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        const errorInfo = this.getErrorDetails(err);
        this.showToast(errorInfo.title, errorInfo.description);
      },
    });
  }

  private populateForm(recipe: GetPost): void {
    this.form.patchValue({
      title: recipe.title,
      description: recipe.body,
      category: recipe.tags?.[0] || '',
      cookingTime: String(recipe.timeCooking || ''),
      proteins: recipe.foodValue?.proteins ?? null,
      fats: recipe.foodValue?.fats ?? null,
      carbs: recipe.foodValue?.carbohydrates ?? null,
      calories: recipe.foodValue?.calories ?? null,
    });

    this.steps.clear();
    if (recipe.cookingSteps && recipe.cookingSteps.length > 0) {
      recipe.cookingSteps.forEach((step) => {
        this.steps.push(this.createStepGroup(step.title, step.description));
      });
    } else {
      this.steps.push(this.createStepGroup());
    }

    this.ingredients.clear();
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      recipe.ingredients.forEach((ing) => {
        this.ingredients.push(this.createIngredientGroup(ing.title, ing.description));
      });
    } else {
      this.ingredients.push(this.createIngredientGroup());
    }
  }

  public createStepGroup(action = '', description = ''): FormGroup<StepForm> {
    return new FormGroup<StepForm>({
      stepAction: new FormControl(action, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      stepDescription: new FormControl(description, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public createIngredientGroup(name = '', description = ''): FormGroup<IngredientForm> {
    return new FormGroup<IngredientForm>({
      name: new FormControl(name, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl(description, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public addStep(): void {
    this.steps.push(this.createStepGroup());
  }

  public removeStep(index: number): void {
    if (this.steps.length > 1) {
      this.steps.removeAt(index);
    }
  }

  public addIngredient(): void {
    this.ingredients.push(this.createIngredientGroup());
  }

  public removeIngredient(index: number): void {
    if (this.ingredients.length > 1) {
      this.ingredients.removeAt(index);
    }
  }

  public closeToast(): void {
    this.toast.set(null);
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
  }

  private showToast(title: string, description: string): void {
    this.toast.set({ title, description });
    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }
    this.toastTimeoutId = setTimeout(() => {
      this.toast.set(null);
    }, 5000);
  }

  private getErrorDetails(err: HttpErrorResponse): ToastInfo {
    const backendMessage = err.error?.message || err.error?.error;

    switch (err.status) {
      case 0:
        return {
          title: 'Ошибка соединения',
          description: 'Не удалось связаться с сервером. Проверьте интернет.',
        };
      case 400:
        return {
          title: 'Неверные данные',
          description: backendMessage || 'Проверьте правильность заполненных полей.',
        };
      case 401:
        return {
          title: 'Требуется авторизация',
          description: 'Срок сессии истек. Войдите в аккаунт заново.',
        };
      case 403:
        return {
          title: 'Доступ запрещен',
          description: 'У вас нет прав для редактирования этого рецепта.',
        };
      case 404:
        return {
          title: 'Не найдено',
          description: 'Рецепт не найден.',
        };
      case 422:
        return {
          title: 'Ошибка валидации',
          description: backendMessage || 'Переданы некорректные параметры.',
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          title: 'Ошибка сервера',
          description: 'На сервере произошел сбой. Попробуйте позже.',
        };
      default:
        return {
          title: 'Произошла ошибка',
          description: backendMessage || `Не удалось обновить рецепт (код ${err.status}).`,
        };
    }
  }

  public onSubmit(): void {
    if (this.form.invalid || !this.postId) {
      this.form.markAllAsTouched();
      return;
    }

    this.toast.set(null);
    this.isSubmitting.set(true);

    const val = this.form.getRawValue();

    const requestPayload: UpdatePostBody = {
      title: val.title,
      body: val.description,
      tags: val.category ? [val.category] : [],
      image: '',
      timeCooking: Number(val.cookingTime) || 0,
      foodValue: {
        proteins: Number(val.proteins) || 0,
        fats: Number(val.fats) || 0,
        carbohydrates: Number(val.carbs) || 0,
        calories: Number(val.calories) || 0,
      },
      cookingSteps: val.steps.map((s) => ({
        title: s.stepAction,
        description: s.stepDescription,
      })),
      ingredients: val.ingredients.map((i) => ({
        title: i.name,
        description: i.description,
      })),
    };

    this.postsService.updatePost(this.postId, requestPayload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        const errorInfo = this.getErrorDetails(err);
        this.showToast(errorInfo.title, errorInfo.description);
      },
    });
  }
}
