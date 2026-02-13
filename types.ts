
export enum Difficulty {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil'
}

export enum RecipeType {
  SWEET = 'Doce',
  SAVORY = 'Salgado',
  FITNESS = 'Fitness',
  VEGETARIAN = 'Vegetariano',
  QUICK = 'Rápido',
  DRINK = 'Bebida'
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
  substitutes?: string[];
  isUsed?: boolean;
}

export interface Step {
  id: string;
  description: string;
  timerSeconds?: number;
}

export interface Nutrition {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: number; // in minutes
  difficulty: Difficulty;
  type: RecipeType;
  ingredients: Ingredient[];
  steps: Step[];
  nutrition?: Nutrition;
  isFavorite?: boolean;
}

export interface UserPreferences {
  diet: RecipeType[];
  fontSize: number; // 1: normal, 2: large, 3: extra large
  isDarkMode: boolean;
}

export type AppView = 'HOME' | 'RECIPE_DETAIL' | 'COOKING_MODE' | 'FAVORITES' | 'EDITOR' | 'AI_ASSISTANT';
