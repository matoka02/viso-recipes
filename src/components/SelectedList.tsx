import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectedRecipeProps {
  recipes: Array<{
    idMeal: string;
    strMeal: string;
  }>;
  selectedMeals: string[];
  onCheckboxChange: (idMeal: string) => void;
}

export const SelectedList: React.FC<SelectedRecipeProps> = ({ recipes, selectedMeals, onCheckboxChange }) => {
  return (
    <div>
      <h3>Selected Recipes</h3>
      <Form>
        {recipes.map((recipe) => (
          <Form.Check
            key={recipe.idMeal}
            type="checkbox"
            id={`meal-checkbox-${recipe.idMeal}`}
            label={recipe.strMeal}
            value={recipe.idMeal}
            checked={selectedMeals.includes(recipe.idMeal)}
            onChange={() => onCheckboxChange(recipe.idMeal)}
          />
        ))}
      </Form>
    </div>
  );
};
