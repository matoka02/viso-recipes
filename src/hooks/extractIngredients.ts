import { Recipe } from '../types/Recipe.type';

/**
* Function for aggregating ingredients from an array of recipes
* @param recipes Array of recipes
* @returns Array of ingredients with concatenated measure valuesArray of ingredients with concatenated measure values, sorted alphabetically by ingredient
*/

interface AggregatedIngredient {
  ingredient: string;
  measure: string;
}


export const aggregateIngredients = (recipes: Recipe[]): AggregatedIngredient[] => {
  const aggregated = recipes.reduce((acc, recipe) => {
    Object.keys(recipe).forEach((key) => {
      if (key.startsWith('strIngredient') && recipe[key as keyof Recipe] !== undefined) {
        const ingredient = recipe[key as keyof Recipe]!;
        const measureKey = `strMeasure${key.slice(13)}`;  // Extract the corresponding measure key
        const measure = recipe[measureKey as keyof Recipe] || '';

        if (ingredient.trim() !== '') {
          const existing = acc.find((item) => item.ingredient === ingredient);
          if (existing) {
            existing.measure += ` + ${measure}`;
          } else {
            acc.push({ ingredient, measure })
          }
        }
      }
    });

    return acc;
  }, [] as AggregatedIngredient[]);

  return aggregated.sort((a, b) => a.ingredient.localeCompare(b.ingredient));
}