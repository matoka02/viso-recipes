import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeSelectedRecipe } from "../redux/recipesSlice";
import { Card, Button, ListGroup, Container, Row, Col } from "react-bootstrap";

// interface Ingredient {
//   name: string;
//   quantity: string;
// }

const SelectedRecipesPage: React.FC = () => {
  const dispatch = useDispatch();

  // Access selected recipes from the Redux store
  const selectedRecipes = useSelector(
    (state: RootState) => state.recipes.selectedRecipes
  );

  // Function to consolidate ingredients across all selected recipes
  const getCombinedIngredients = () => {
    const ingredientMap: Record<string, string> = {};

    selectedRecipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && measure) {
          if (ingredientMap[ingredient]) {
            ingredientMap[ingredient] = `${ingredientMap[ingredient]}, ${measure}`;
          } else {
            ingredientMap[ingredient] = measure;
          }
        }
      }
    });

    return Object.entries(ingredientMap).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  };

  const combinedIngredients = getCombinedIngredients();

  // Handle recipe removal
  const handleRemoveRecipe = (idMeal: string) => {
    dispatch(removeSelectedRecipe(idMeal));
  };

  return (
    <Container className="selected-recipes-page mt-4">
      <h1 className="mb-4">Selected Recipes</h1>

      {selectedRecipes.length === 0 ? (
        <p>No recipes selected yet.</p>
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <h2>Recipes Overview</h2>
              <Row>
                {selectedRecipes.map((recipe) => (
                  <Col sm={6} md={4} lg={3} key={recipe.idMeal} className="mb-3">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                      />
                      <Card.Body>
                        <Card.Title>{recipe.strMeal}</Card.Title>
                        <Card.Text>
                          <strong>Category:</strong> {recipe.strCategory}
                          <br />
                          <strong>Area:</strong> {recipe.strArea}
                        </Card.Text>
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveRecipe(recipe.idMeal)}
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2>Combined Ingredients</h2>
              <ListGroup>
                {combinedIngredients.map((ingredient) => (
                  <ListGroup.Item key={ingredient.name}>
                    <strong>{ingredient.name}:</strong> {ingredient.quantity}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SelectedRecipesPage;