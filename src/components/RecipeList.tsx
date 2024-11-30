import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { RecipeCard } from './RecipeCard';
import { SelectedList } from './SelectedList';

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
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const handleCheckboxChange = (idMeal: string) => {
    setSelectedMeals(prevState =>
      prevState.includes(idMeal)
        ? prevState.filter(mealId => mealId !== idMeal)
        : [...prevState, idMeal]
    );
  };

  return(
    <div>
      <SelectedList
        recipes={recipes}
        selectedMeals={selectedMeals}
        onCheckboxChange={handleCheckboxChange}
      />
      <Row xs={1} md={3} className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe.idMeal}>
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </div>
  )
};