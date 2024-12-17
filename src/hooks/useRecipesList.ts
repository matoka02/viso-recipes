import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '../types/Recipe.type';

/**
 * Custom hook for managing the list of favorite recipes.
 *
 * @returns {Object} An object containing:
 *   - `selectedRecipes` {Recipe[]} - The current list of favorite recipes.
 *   - `handleToggleFavorite` {(recipe: Recipe) => void} - Function to toggle a recipe's favorite status 
 *     (adds the recipe if it's not selected, removes it if it already exists).
 */

export const useRecipesList = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleRecipe } = useMutation<Recipe[], Error, Recipe>({
    mutationFn: (recipe: Recipe) => {
      const selectedRecipes = queryClient.getQueryData<Recipe[]>(['selectedRecipes']) || [];
      const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);

      // Updating the list of favorite recipes
      const updatedRecipes = isSelected
        ? selectedRecipes.filter((r) => r.idMeal !== recipe.idMeal)
        : [...selectedRecipes, recipe];

      // Return a Promise with the updated list
      return Promise.resolve(updatedRecipes);
    },
    onSuccess: (updatedRecipes) => {
      // Install the updated list into the cache
      queryClient.setQueryData(['selectedRecipes'], updatedRecipes);
    },
  });

  const handleCheckboxChange = (recipe: Recipe) => {
    toggleRecipe(recipe);
  }

  const selectedRecipes = queryClient.getQueryData<Recipe[]>(['selectedRecipes']) || [];

  return {
    selectedRecipes,
    handleCheckboxChange,
  };
}

