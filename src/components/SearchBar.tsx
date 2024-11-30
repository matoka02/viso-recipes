import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(evt.target.value);
    onSearch(evt.target.value);
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