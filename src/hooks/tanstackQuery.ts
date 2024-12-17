import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';

import { Recipe } from '../types/Recipe.type';
import { Category } from '../types/Category.type';
import { RecipeDetailsProps } from '../types/RecipeDetails.type';
import { fetchCategories, fetchRecipeDetails, fetchRecipesBySearch } from '../utils/api';


export const useRecipes = (searchTerm: string) => {
  return useQuery<Recipe[], Error>({
    queryKey: ['recipes', searchTerm],
    queryFn: () => fetchRecipesBySearch(searchTerm),
    placeholderData: keepPreviousData,
  })
}

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}

export const useRecipeDetails = (id: string | undefined) => {
  return useQuery<RecipeDetailsProps['recipe'], Error>({
    queryKey: ['recipeDetails', id],
    queryFn: () => fetchRecipeDetails(id!),
    enabled: !!id, // We execute the query only if the id exists
  });
};

export const useSelectedRecipes = () => {
  const queryClient = useQueryClient();
  const { data: selectedRecipes = [] } = useQuery<Recipe[]>({
    queryKey: ['selectedRecipes'],
    initialData: []
  });

  const removeSelectedRecipe = (idMeal: string) => {
    const updatedRecipes = selectedRecipes.filter((recipe) => recipe.idMeal !== idMeal);
    queryClient.setQueryData(['selectedRecipes'], updatedRecipes);
  };

  const addSelectedRecipe = (recipe: Recipe) => {
    const updatedRecipes = [...selectedRecipes, recipe];
    queryClient.setQueryData(['selectedRecipes'], updatedRecipes);
  };

  return { selectedRecipes, addSelectedRecipe, removeSelectedRecipe }
}

