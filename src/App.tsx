import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import AllRecipesPage from './pages/AllRecipesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import SelectedRecipesPage from './pages/SelectedRecipesPage';
// import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<AllRecipesPage />} />
        <Route path='/recipe/:id' element={<RecipeDetailsPage />} />
        <Route path='/selected' element={<SelectedRecipesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
