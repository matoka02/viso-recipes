import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';
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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <h1 className="my-4 text-center">All Recipes</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter onCategoryChange={handleCategoryChange} />
      {isLoading ? (
        <Spinner animation="border" className="d-block mx-auto my-4" />
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