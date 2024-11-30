import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
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

  return (
    <Form.Group controlId="searchBar" className="my-3">
      <Form.Control
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </Form.Group>
  );
};