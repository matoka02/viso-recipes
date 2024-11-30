import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../redux/recipesSlice';
import { AppDispatch, RootState } from '../redux/store';
import { Button, Container, Spinner } from 'react-bootstrap';
import { RecipeDetails } from '../components/RecipeDetail';

const RecipeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { selectedRecipe, isLoading } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeDetails(id));
    }
  }, [dispatch, id])

  const handleBackClick = () => {
    navigate(-1); 
  };


  return (
    <Container className="my-4">
      <Button variant="secondary" onClick={handleBackClick} className="mb-3">
        Back
      </Button>
      {isLoading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : (
        selectedRecipe && (
          <RecipeDetails
            recipe={{
              strMeal: selectedRecipe.strMea!,
              strCategory: selectedRecipe.strCategory!,
              strArea: selectedRecipe.strArea!,
              strInstructions: selectedRecipe.strInstructions!,
              strMealThumb: selectedRecipe.strMealThumb!,
              strYoutube: selectedRecipe.strYoutube!,
              ingredients: Object.keys(selectedRecipe)
                .filter((key) => key.startsWith('strIngredient') && selectedRecipe[key])
                .map((key) => ({
                  name: selectedRecipe[key]!,
                  measure: selectedRecipe[`strMeasure${key.slice(-1)}`]!,
                }))
                .filter((ingredient) => ingredient.name && ingredient.measure),
            }}
          />
        )
      )}
    </Container>
  );
};

export default RecipeDetailsPage;