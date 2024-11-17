import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userName) {
            try {
                const response = await axios.get('http://localhost:5000/api/favorites', {
                    params: { userName },
                });
                navigate('/results', { state: { favorites: response.data } });
            } catch (error) {
                console.error('Error fetching favorites:', error);
                alert('Failed to fetch favorites.');
            }
        } else {
            alert('Please enter a user name.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Search Favorites by User</h1>
            <label>User Name:</label>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;