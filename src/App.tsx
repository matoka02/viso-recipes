import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AllRecipesPage from './pages/AllRecipesPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import SelectedRecipesPage from './pages/SelectedRecipesPage';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={<AllRecipesPage/>}/>
      <Route path='/recipe/:id' element={<RecipeDetailsPage/>}/>
      <Route path='/selected' element={<SelectedRecipesPage/>}/>
    </Routes>
  </Router>
  );

}

export default App;
