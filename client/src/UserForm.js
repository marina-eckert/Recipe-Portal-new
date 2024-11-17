import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', { 
        name, 
        email, 
        age 
      });
      console.log('User added:', response.data);
    } catch (error) {
      console.error('There was an error adding the user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>User Form</h1>
      <label>Name:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <br />
      <label>Email:</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <br />
      <label>Age:</label>
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        required 
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
