import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Form } from 'react-bootstrap';

import { fetchCategories } from '../utils/api';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const { data: categories = [], isLoading, error } = useQuery<Category[], Error>({ queryKey: ['categories'], queryFn: fetchCategories });

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
        {/* <Form.Label className='mb-3 text-primary'>Filter by Category</Form.Label> */}
        <Form.Control
          as='select'
          defaultValue=''
          onChange={handleCategoryChange}
        >
          <option value=''>All Categories</option>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
};