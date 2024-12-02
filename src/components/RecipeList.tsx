import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { 
  // addSelectedRecipe, 
  addSelectedRecipeWithDetails,
  removeSelectedRecipe } from '../redux/recipesSlice';
import { RecipeCard } from './RecipeCard';
  
interface RecipeListProps {
  recipes: Array<{
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  }>;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();
  const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);

  const handleAddRecipe = (recipeId: string) => {
    dispatch(addSelectedRecipeWithDetails(recipeId));
  };

  const handleRemoveRecipe = (recipeId: string) => {
    dispatch(removeSelectedRecipe(recipeId));
  };

  const handleCheckboxChange = (recipeId: string) => {
    const isSelected = selectedRecipes.some((r) => r.idMeal === recipeId);
    if (isSelected) {
      handleRemoveRecipe(recipeId);
    } else {
      handleAddRecipe(recipeId);
    }
  };

  return (
    <Row xs={1} md={2} className='g-4'>
      {recipes.map((recipe) => (
        <Col key={recipe.idMeal}>
          <Form.Group>
            <Form.Check
              type='checkbox'
              label='Select to favorites'
              checked={selectedRecipes.some((r) => r.idMeal === recipe.idMeal)}
              onChange={() => handleCheckboxChange(recipe.idMeal)}
            />
            <RecipeCard recipe={recipe} />
          </Form.Group>
        </Col>
      ))}
    </Row>
  );
};