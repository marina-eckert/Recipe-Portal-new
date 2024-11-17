import React, { useState } from 'react';
import axios from 'axios';

const AddFavorite = () => {
  const [userId, setUserId] = useState('');
  const [recipeId, setRecipeId] = useState('');
  const [feedback, setFeedback] = useState('');

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
        <option value="1">John Doe</option>
        <option value="2">Jane Smith</option>
        <option value="3">Alice Johnson</option>
      </select>
      <br />
      <label>Recipe:</label>
      <select value={recipeId} onChange={(e) => setRecipeId(e.target.value)} required>
        <option value="">Select Recipe</option>
        <option value="1">Spaghetti Bolognese</option>
        <option value="2">Tomato Soup</option>
        <option value="3">Chicken Curry</option>
      </select>
      <br />
      <button type="submit">Add to Favorites</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default AddFavorite;