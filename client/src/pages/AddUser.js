import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        await axios.post('http://localhost:5000/api/users', { name, email, password });
        setFeedback('Registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
      } catch (error) {
        setFeedback('Error: Could not register user.');
        console.error(error);
      }
    } else {
      setFeedback('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <label>Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <br />
      <button type="submit">Submit</button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
};

export default AddUser;