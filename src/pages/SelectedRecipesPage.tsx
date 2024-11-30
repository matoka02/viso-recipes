import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AppDispatch, RootState } from '../redux/store';
import { removeSelectedRecipeById } from '../redux/recipesSlice';

const SelectedRecipesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedRecipes = useSelector((state: RootState) => state.recipes.selectedRecipes);

  const handleRemove = (idMeal: string) => {
    dispatch(removeSelectedRecipeById(idMeal));
  };

  const aggregatedIngredients = selectedRecipes.reduce((acc, recipe) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        acc.push(`${ingredient}: ${measure}`);
      }
    }
    return acc;
  }, [] as string[]);

  return (
    <div>
      <h1>Selected Recipes</h1>
      <Row xs={1} md={3} className="g-4">
        {selectedRecipes.map((recipe) => (
          <Col key={recipe.idMeal}>
            <Card>
              
              <Card.Body>
                <Card.Title>{recipe.strMeal}</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => handleRemove(recipe.idMeal)}
                >
                  Remove
                </Button>
                <Card.Img variant="top" src={recipe.strMealThumb} />
                <Card.Text>{recipe.strInstructions}</Card.Text>                
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2>Aggregated Ingredients</h2>
      <ul>
        {aggregatedIngredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};


export default SelectedRecipesPage;