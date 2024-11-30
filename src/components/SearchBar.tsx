import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import { debounce } from '../utils/debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500); 

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <div className='my-4'>
      <h5 className='mb-3 text-primary'>Search for recipes</h5>
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type='text'
          // placeholder='Search for recipes...'
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <Button variant='primary' onClick={handleSearchSubmit}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
};