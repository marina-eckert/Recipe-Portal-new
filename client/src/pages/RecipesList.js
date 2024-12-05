import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes-with-descriptions');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes');
      }
    };

    fetchRecipes();
  }, []);  

  return (
    <div>
      <h1>All Recipes</h1>
      {error && <p>{error}</p>}
      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.recipe_id} style={{ marginBottom: '20px' }}>
              <h2>{recipe.title}</h2>
              <p><strong>Cuisine Type:</strong> {recipe.cuisine_type || 'N/A'}</p>
              <p><strong>Description:</strong> {recipe.description}</p>
              <p><strong>Cooking Time:</strong> {recipe.cooking_time} minutes</p>
              <p><strong>Steps:</strong> {recipe.steps}</p>
              <p><strong>Uploaded on:</strong> {new Date(recipe.upload_date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
