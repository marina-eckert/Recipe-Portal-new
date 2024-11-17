import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [steps, setSteps] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && cuisineType && steps) {
      try {
        await axios.post('http://localhost:5000/api/recipes', { title, description, cuisineType, steps });
        setFeedback('Recipe added successfully!');
        setTitle('');
        setDescription('');
        setCuisineType('');
        setSteps('');
      } catch (error) {
        setFeedback('Error: Could not add recipe.');
        console.error(error);
      }
    } else {
      setFeedback('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add New Recipe</h1>
      <label>Recipe Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <br />
      <label>Cuisine Type:</label>
      <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} required />
      <br />
      <label>Steps:</label>
      <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
      <br />
      <button type="submit">Submit Recipe</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default AddRecipe;