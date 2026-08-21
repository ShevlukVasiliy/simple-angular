export interface CreatePostBody {
  body: string;
  title: string;
  tags: string[];
  image: string;
  timeCooking: number;
  foodValue: FoodValue;
  cookingSteps: CookingStep[];
  ingredients: Ingredient[];
}

export interface FoodValue {
  calories: number;
  fats: number;
  carbohydrates: number;
  proteins: number;
}

export interface CookingStep {
  title: string;
  description: string;
}

export interface Ingredient {
  title: string;
  description: string;
}

export type CreatePostResponse = CreatePostBody;
