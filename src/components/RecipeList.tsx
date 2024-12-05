import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Row, Col, Form } from 'react-bootstrap';

import { Recipe } from '../utils/types';
import { RecipeCard } from './RecipeCard';


interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {

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


  return (
    <Row xs={1} md={2} className='g-4'>
      {recipes.map((recipe) => (
        <Col key={recipe.idMeal}>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Select to favorites'
              checked={selectedRecipes.some((r) => r.idMeal === recipe.idMeal)}
              onChange={() => handleCheckboxChange(recipe)}
            />
            <RecipeCard recipe={recipe} />
          </Form.Group>
        </Col>
      ))}
    </Row>
  );
};