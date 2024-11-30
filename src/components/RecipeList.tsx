import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { RecipeCard } from './RecipeCard';

interface RecipeListProps {
  recipes: Array<{
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  }>;
  // onRecipeClick?: (id: string) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  // onRecipeClick 
}) => (
  <Row xs={1} md={3} className="g-4">
    {recipes.map((recipe) => (
      <Col key={recipe.idMeal}>
        <RecipeCard
          recipe={recipe}
          // onClick={onRecipeClick ? () => onRecipeClick(recipe.idMeal) : undefined}
        />
      </Col>
    ))}
  </Row>
);