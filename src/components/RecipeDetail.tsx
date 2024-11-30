import React from 'react';
import { Card, Table, Container } from 'react-bootstrap';

interface RecipeDetailsProps {
  recipe: {
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    ingredients: Array<{ name: string; measure: string }>;
  };
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipe }) => {
  const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strYoutube, ingredients } = recipe;

  return (
    <Container>
      <Card className="my-4">
        <Card.Img variant="top" src={strMealThumb} alt={strMeal} />
        <Card.Body>
          <Card.Title className="text-center">{strMeal}</Card.Title>
          <Card.Text>
            <strong>Category:</strong> {strCategory} <br />
            <strong>Area:</strong> {strArea}
          </Card.Text>
          <Card.Text>
            <strong>Instructions:</strong> <br /> {strInstructions}
          </Card.Text>
          {strYoutube && (
            <Card.Text>
              <strong>Video:</strong> <a href={strYoutube} target="_blank" rel="noopener noreferrer">Watch on YouTube</a>
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