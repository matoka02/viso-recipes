import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  };
  onClick?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return(
    <Card onClick={handleCardClick} className='cursor-pointer'>
    <Card.Img variant='top' src={recipe.strMealThumb} alt={recipe.strMeal} />
    <Card.Body>
      <Card.Title>{recipe.strMeal}</Card.Title>
      <Card.Text>
        <strong>Category:</strong> {recipe.strCategory} <br />
        <strong>Area:</strong> {recipe.strArea}
      </Card.Text>
    </Card.Body>
  </Card>
  )
};
