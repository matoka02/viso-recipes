import React from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { 
  // addSelectedRecipe, 
  addSelectedRecipeWithDetails,
  removeSelectedRecipe } from '../redux/recipesSlice';
// import { RootState } from '../store'; // Подключите правильный путь до вашего rootReducer
// import { addSelectedRecipe, removeSelectedRecipe } from '../slices/recipesSlice';

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

  const handleCheckboxChange = (recipe: any) => {
    const isSelected = selectedRecipes.some((r) => r.idMeal === recipe.idMeal);
    if (isSelected) {
      dispatch(removeSelectedRecipe(recipe.idMeal));
    } else {
      dispatch(addSelectedRecipeWithDetails(recipe.idMeal));
    }
  };

  return (
    <Row xs={1} md={3} className="g-4">
      {recipes.map((recipe) => (
        <Col key={recipe.idMeal}>
          <Card>
            <Card.Img variant="top" src={recipe.strMealThumb} />
            <Card.Body>
              <Card.Title>{recipe.strMeal}</Card.Title>
              <Card.Text>
                Category: {recipe.strCategory}
                <br />
                Area: {recipe.strArea}
              </Card.Text>
              <Form.Check
                type="checkbox"
                label="Select"
                checked={selectedRecipes.some((r) => r.idMeal === recipe.idMeal)}
                onChange={() => handleCheckboxChange(recipe)}
              />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};