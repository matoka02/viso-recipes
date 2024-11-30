import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';

import { AddDispatch, RootState } from '../redux/store';
import { fetchRecipes, setCurrentPage } from '../redux/recipesSlice';
import { SearchBar } from '../components/SearchBar';
import { RecipeList } from '../components/RecipeList';
import { Pagination } from '../components/Pagination';

const AllRecipesPage: React.FC = () => {
  const dispatch: AddDispatch=useDispatch();
  const {recipes, currentPage, isLoading}=useSelector((state:RootState)=>state.recipes);

  useEffect(()=>{
    dispatch(fetchRecipes(''));
  }, [dispatch]);

  const handleSearch=(query:string)=>{
    dispatch(fetchRecipes(query));
  }

  const handlePageChange=(page:number)=>{
    dispatch(setCurrentPage(page));
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const paginatedRecipes = recipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    // <h2>AllRecipesPage</h2>
    <Container>
      <h1 className="my-4 text-center">All Recipes</h1>
      <SearchBar onSearch={handleSearch}/>
      {isLoading? (
        <Spinner animation="border" className="d-block mx-auto my-4"/>
      ):(
        <>
        <RecipeList recipes={paginatedRecipes}/>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
    </Container>
  )
}

export default AllRecipesPage;