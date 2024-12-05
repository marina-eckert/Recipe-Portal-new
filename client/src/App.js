import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Imprint from './pages/Imprint';
import Maintenance from './pages/Maintenance';
import AddFavorite from './pages/AddFavorite';
import AddUser from './pages/AddUser';
import AddRecipe from './pages/AddRecipe';
import SearchForm from './pages/SearchForm';
import SearchResults from './pages/SearchResults';
import FavoriteDetail from './pages/FavoriteDetail';
import RecipesList from './pages/RecipesList'; 
import Map from './pages/Map';

import "./App.css";

const App = () => (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/add-favorite" element={<AddFavorite />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/search" element={<SearchForm />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/recipes-list" element={<RecipesList />} />
        <Route path="/geolocation" element={<Map />} />
        <Route path="/favorite/:favoriteId" element={<FavoriteDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
export default App;