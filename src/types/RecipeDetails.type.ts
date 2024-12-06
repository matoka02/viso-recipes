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