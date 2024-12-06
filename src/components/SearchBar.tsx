import React, { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';


interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`enter: ${evt.target.value}`);
    setSearchTerm(evt.target.value);
    // console.log(`start: ${evt.target.value}`);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm.trim());
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button variant='primary' onClick={handleSearchSubmit}>
          Search
        </Button>
      </InputGroup>
    </div>
  );
};