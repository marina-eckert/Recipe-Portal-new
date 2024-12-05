import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [steps, setSteps] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]); 
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');  
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setFeedback('Error: Could not fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form values:', { title, description, cuisineType, steps, userId }); 

    if (title && description && cuisineType && steps && userId) {
      try {
        const response = await axios.post('http://localhost:5000/api/recipes', {
          title,
          description,
          cuisineType,
          steps,
          userId,
        });


        setFeedback('Recipe added successfully!');
        setTitle('');
        setDescription('');
        setCuisineType('');
        setSteps('');
        setUserId(''); 
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

      {/* Recipe Title */}
      <label>Recipe Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />

      {/* Recipe Description */}
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />

      {/* Cuisine Type */}
      <label>Cuisine Type:</label>
      <input
        type="text"
        value={cuisineType}
        onChange={(e) => setCuisineType(e.target.value)}
        required
      />
      <br />

      {/* Recipe Steps */}
      <label>Steps:</label>
      <textarea
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />
      <br />

      {/* User Selection */}
      <label>Select User:</label>
      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      >
        <option value="">Select a User</option>
        {users.map((user) => (
          <option key={user.user_id} value={user.user_id}>
            {user.name}
          </option>
        ))}
      </select>
      <br />

      {/* Submit Button */}
      <button type="submit">Submit Recipe</button>

      {/* Feedback */}
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default AddRecipe;
