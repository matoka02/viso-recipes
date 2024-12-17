import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import { useRecipesList } from '../hooks/useRecipesList';
import { Recipe } from '../types/Recipe.type';
import { RecipeCard } from './RecipeCard';


interface RecipeListProps {
  recipes: Recipe[];
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {

  const { selectedRecipes, handleCheckboxChange } = useRecipesList();

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