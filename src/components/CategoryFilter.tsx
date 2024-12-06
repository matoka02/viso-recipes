import React from 'react';
import { Form } from 'react-bootstrap';

import { Category } from '../types/Category.type';
import { useCategories } from '../hooks/tanstackQuery';


interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const { data: categories = [], isLoading, error } = useCategories();

  const handleCategoryChange = (evt: React.ChangeEvent<any>) => {
    const category = (evt.target as HTMLSelectElement).value || null; // Explicitly cast event.target
    onCategoryChange(category);
  };

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error loading categories: {error.message}</p>;
  }

  return (
    <div className='my-4'>
      <h5 className='mb-3 text-primary'>Filter by Category</h5>
      <Form.Group controlId='categoryFilter' className='mb-3'>
        <Form.Control
          as='select'
          defaultValue=''
          onChange={handleCategoryChange}
        >
          <option value=''>All Categories</option>
          {Array.isArray(categories) &&
            categories.map((category: Category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};