import { Title } from '@angular/platform-browser';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseLayout } from '../../layout/base-layout/base-layout';
import { Divider } from '../../uikit/divider/divider';
import { PostsService } from '../../services/posts-service';
import { ToastService } from '../../services/toast-service';
import { ToastInfo } from '../../uikit/components/toast/toast.types';
import { CreatePostBody } from '../../interface/posts/create-post';

export interface StepForm {
  stepAction: FormControl<string>;
  stepDescription: FormControl<string>;
}

export interface IngredientForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-create-recipe',
  imports: [BaseLayout, Divider, ReactiveFormsModule],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe implements OnInit {
  private pageTitle = inject(Title);
  private postsService = inject(PostsService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  public formError = signal<string | null>(null);
  public isSubmitting = signal<boolean>(false);

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

    steps: new FormArray<FormGroup<StepForm>>([this.createStepGroup()]),
    ingredients: new FormArray<FormGroup<IngredientForm>>([this.createIngredientGroup()]),
  });

  public ngOnInit(): void {
    this.pageTitle.setTitle('Foodie: Создание рецепта');
  }

  public get steps(): FormArray<FormGroup<StepForm>> {
    return this.form.controls.steps;
  }

  public get ingredients(): FormArray<FormGroup<IngredientForm>> {
    return this.form.controls.ingredients;
  }

  public createStepGroup(): FormGroup<StepForm> {
    return new FormGroup<StepForm>({
      stepAction: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      stepDescription: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  public createIngredientGroup(): FormGroup<IngredientForm> {
    return new FormGroup<IngredientForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: new FormControl('', {
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
          description: 'У вас нет прав для выполнения этой операции.',
        };
      case 409:
        return {
          title: 'Конфликт данных',
          description: backendMessage || 'Такой рецепт уже существует.',
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
          description: backendMessage || `Не удалось создать рецепт (код ${err.status}).`,
        };
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.formError.set(null);
    this.isSubmitting.set(true);

    const val = this.form.getRawValue();

    const requestPayload: CreatePostBody = {
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

    this.postsService.createPost(requestPayload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.toastService.success('Рецепт создан', 'Ваш рецепт успешно опубликован.');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting.set(false);
        const errorInfo = this.getErrorDetails(err);
        this.formError.set(`${errorInfo.title}: ${errorInfo.description}`);
        this.toastService.error(errorInfo.title, errorInfo.description);
      },
    });
  }
}
