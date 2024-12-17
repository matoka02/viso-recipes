import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Alert, Table, Button, ButtonGroup } from 'react-bootstrap';

import { useSelectedRecipes } from '../hooks/tanstackQuery';
import { aggregateIngredients } from '../hooks/extractIngredients';


const SelectedRecipesPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRecipes, removeSelectedRecipe } = useSelectedRecipes();

  const aggregatedIngredients = aggregateIngredients(selectedRecipes);

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
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button
                      variant='primary'
                      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                    >
                      Details
                    </Button>
                    <Button
                      variant='danger'
                      onClick={() => removeSelectedRecipe(recipe.idMeal)}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
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