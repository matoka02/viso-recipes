import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { Recipe } from '../types/Recipe.type';
import { useRecipes } from '../hooks/tanstackQuery';
import { SearchBar } from '../components/SearchBar';
import { RecipeList } from '../components/RecipeList';
import { Pagination } from '../components/Pagination';
import { CategoryFilter } from '../components/CategoryFilter';


const AllRecipesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || null;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data: recipes = [], isLoading: isLoadingRecipes } = useRecipes(searchTerm);

  const filteredRecipes: Recipe[] = Array.isArray(recipes)
    ? selectedCategory
      ? recipes.filter((recipe) => recipe.strCategory === selectedCategory)
      : recipes
    : [];

  const itemsPerPage = 2;
  // console.log(filteredRecipes.length);  
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (query: string) => {
    setSearchParams({
      search: query,
      category: selectedCategory || '',
      page: '1',  // Reset to the first page
    })
  };

  const handleCategoryChange = (category: string | null) => {
    setSearchParams({
      search: searchTerm,
      category: category || '',
      page: '1',
    })
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      search: searchTerm,
      category: selectedCategory || '',
      page: page.toString(),
    });
  };

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-primary fw-bold">All Recipes from theMealDB</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3">
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col xs={12} md={6}>
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </Col>
      </Row>
      {isLoadingRecipes ? (
        <Spinner animation="border" className="d-block mx-auto my-4 text-primary" />
      ) : filteredRecipes.length === 0 ? (
        <p className="text-center text-muted my-4">
          No recipes found for the selected category.
        </p>
      ) :
        (
          <>
            <RecipeList recipes={paginatedRecipes} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
    </Container>
  );
};

export default AllRecipesPage;