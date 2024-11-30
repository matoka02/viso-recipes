import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Alert, Table, Button } from 'react-bootstrap';

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
        acc.push({ ingredient, measure });
      }
    }
    return acc;
  }, [] as { ingredient: string; measure: string }[]);

  if (selectedRecipes.length === 0) {
    return (
      <div>
        <Alert variant='warning' className='text-center'>
          You have no recipes selected. Go to the main page to select recipes!
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h1 className='my-4 text-center'>Selected Recipes</h1>
      <Row xs={1} md={3} lg={4} className='g-4'>
        {selectedRecipes.map((recipe) => (
          <Col key={recipe.idMeal}>
            <Card>
              <Card.Body className='d-flex flex-column'>
                <div className='d-flex justify-content-between align-items-center'>
                  <Card.Title>{recipe.strMeal}</Card.Title>
                  <Button
                    variant='danger'
                    onClick={() => handleRemove(recipe.idMeal)}
                  >
                    Remove
                  </Button>
                </div>
                <Card.Img variant='top' src={recipe.strMealThumb} className='mt-4 mb-4' />
                <Card.Text>{recipe.strInstructions}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className='my-4 text-center'>Aggregated Ingredients</h2>
      <Table striped bordered hover responsive variant='secondary'>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedIngredients.map((item, index) => (
            <tr key={index}>
              <td>{item.ingredient}</td>
              <td>{item.measure}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SelectedRecipesPage;