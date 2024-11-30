import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import { RootState, AppDispatch } from '../redux/store';
import { fetchAllCategories, setSelectedCategory } from '../redux/recipesSlice';

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const dispatch: AppDispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.recipes.categories);
  const selectedCategory = useSelector((state: RootState) => state.recipes.selectedCategory);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCategoryChange = (evt: React.ChangeEvent<any>) => {
    const category = (evt.target as HTMLSelectElement).value || null; // Explicitly cast event.target
    dispatch(setSelectedCategory(category));
    onCategoryChange(category);
  };

  return (
    <div className='my-4'>
      <h5 className='mb-3 text-primary'>Filter by Category</h5>
      <Form.Group controlId='categoryFilter' className='mb-3'>
        {/* <Form.Label className='mb-3 text-primary'>Filter by Category</Form.Label> */}
        <Form.Control
          as='select'
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};