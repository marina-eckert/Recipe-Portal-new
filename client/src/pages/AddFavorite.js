import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddFavorite = () => {
  const [userId, setUserId] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        const recipesResponse = await axios.get('http://localhost:5000/api/recipes');
        setUsers(usersResponse.data);
        setRecipes(recipesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId && recipeId) {
      try {
        await axios.post('http://localhost:5000/api/favorites', { userId, recipeId });
        setFeedback('Favorite added successfully!');
        setUserId('');
        setRecipeId('');
      } catch (error) {
        setFeedback('Error: Could not add favorite.');
        console.error(error);
      }
    } else {
      setFeedback('Please select both User and Recipe.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Favorite</h1>

      <label>User:</label>
      <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.name}
          </option>
        ))}
      </select>
      <br />

      <label>Recipe:</label>
      <select value={recipeId} onChange={(e) => setRecipeId(e.target.value)} required>
        <option value="">Select Recipe</option>
        {recipes.map((recipe) => (
          <option key={recipe.recipe_id} value={recipe.recipe_id}>
            {recipe.title}
          </option>
        ))}
      </select>
      <br />

      <button type="submit">Add to Favorites</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default AddFavorite;
