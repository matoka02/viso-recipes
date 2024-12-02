import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import { AppDispatch, RootState } from '../redux/store';
import { fetchRecipes, setCurrentPage } from '../redux/recipesSlice';
import { SearchBar } from '../components/SearchBar';
import { RecipeList } from '../components/RecipeList';
import { Pagination } from '../components/Pagination';
import { CategoryFilter } from '../components/CategoryFilter';

const AllRecipesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { recipes, currentPage, isLoading, selectedCategory } = useSelector(
    (state: RootState) => state.recipes
  );

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    dispatch(fetchRecipes(''));
  }, [dispatch]);

  useEffect(() => {
    setFilteredRecipes(
      selectedCategory
        ? recipes.filter((recipe) => recipe.strCategory === selectedCategory)
        : recipes
    );
  }, [recipes, selectedCategory]);

  const handleSearch = (query: string) => {
    dispatch(fetchRecipes(query));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCurrentPage(1)); // Reset to the first page when changing categories
  };

  const itemsPerPage = 2;
  // console.log(filteredRecipes.length);  
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      {isLoading ? (
        <Spinner animation="border" className="d-block mx-auto my-4 text-primary" />
      ) : (
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