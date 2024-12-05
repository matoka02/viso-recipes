import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchRecipeDetails } from '../utils/api';
import { RecipeDetails } from '../components/RecipeDetail';
import { RecipeDetailsProps } from '../utils/types';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: recipe, isLoading, error } = useQuery<RecipeDetailsProps['recipe']>({
    queryKey: ['recipeDetails', id],
    queryFn: () => fetchRecipeDetails(id!),
    enabled: !!id,
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <Spinner animation='border' className='d-block mx-auto my-4' />;
  }

  if (error) {
    return <p className='text-center text-danger'>Failed to load recipe details.</p>;
  }

  if (!recipe) {
    return <p className='text-center text-muted'>No recipe found.</p>;
  }

  const ingredients = Object.keys(recipe)
    .filter((key) => key.startsWith('strIngredient') && recipe[key])
    .map((key) => ({
      name: recipe[key]! as string,
      measure: recipe[`strMeasure${key.slice(-1)}`]! as string,
    }))
    .filter((ingredient) => ingredient.name && ingredient.measure);


  return (
    <Container className='my-4'>
      <Button variant='secondary' onClick={handleBackClick} className='mb-3'>
        Back
      </Button>
      <RecipeDetails
        recipe={{
          strMeal: recipe.strMeal!,
          strCategory: recipe.strCategory!,
          strArea: recipe.strArea!,
          strInstructions: recipe.strInstructions!,
          strMealThumb: recipe.strMealThumb!,
          strYoutube: recipe.strYoutube!,
          ingredients,
        }}
      />
    </Container>
  );
};

export default RecipeDetailsPage;