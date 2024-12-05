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

export interface CategoryFilterProps {
  categories: string[];
  onCategoryChange: (category: string | null) => void;
}

interface Ingredient {
  name: string;
  measure: string;
}

export interface RecipeDetailsProps {
  recipe: {
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    ingredients: Ingredient[];   
    [key: string]: string | null | Ingredient[];  
  };
}

// export interface RecipeDetails {
//   idMeal: string;
//   strMeal: string;
//   strCategory: string;
//   strArea: string;
//   strInstructions: string;
//   strMealThumb: string;
//   strYoutube: string;
//   [key: string]: string | undefined;
// }



// export interface RecipeState {
//   recipes: Recipe[];
//   categories: string[];
//   selectedCategory: string | null,
//   selectedRecipes: RecipeDetails[];
//   searchTerm: string;
//   currentPage: number;
//   isLoading: boolean;
//   error: string | null;
//   selectedRecipe: RecipeDetails | null;
// }
