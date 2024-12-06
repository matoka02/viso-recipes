export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: `strIngredient${number}`]: string | undefined; // Allow dynamic ingredient keys
  [key: `strMeasure${number}`]: string | undefined; // Allow dynamic measure keys
}