import React from 'react';
import { Card, Table, Container, Button } from 'react-bootstrap';

import { RecipeDetailsProps } from '../types/RecipeDetails.type';

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, ingredients } = recipe;

  return (
    <Container>
      <Card className='my-4'>
        <Card.Img variant='top' src={strMealThumb} alt={strMeal} />
        <Card.Body>
          <Card.Title className='text-center'>{strMeal}</Card.Title>
          <Card.Text>
            <strong>Category:</strong> {strCategory} <br />
            <strong>Area:</strong> {strArea}
          </Card.Text>
          <Card.Text>
            <strong>Instructions:</strong> <br /> {strInstructions}
          </Card.Text>
          {strYoutube && (
            <Card.Text>
              <strong>Video:</strong> <Button
                variant='primary'
                href={strYoutube}
                target='_blank'
                rel='noopener noreferrer'
              >
                Watch on YouTube
              </Button>
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      <h4>Ingredients</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Measure</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.measure}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
