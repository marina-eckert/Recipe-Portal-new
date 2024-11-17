import React, { useState } from 'react';

function Maintenance() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/maintenance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                setError(error);
                return;
            }

            setAccessGranted(true);
            setError('');
        } catch (err) {
            setError('An error occurred while authenticating.');
        }
    };

    return (
        <main>
            {!accessGranted ? (
                <form onSubmit={handleLogin}>
                    <h3 className="maintenance__header">Maintenance Login</h3>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
            ) : (
                <div>
                    <h3 className="maintenance__header">Maintenance Page</h3>
                    <ul>
                        <li><a href="/add-user">Add New User</a></li>
                        <li><a href="/add-recipe">Add New Recipe</a></li>
                        <li><a href="/add-favorite">Add Recipe to Favorites</a></li>
                        <li><a href="/search">Find a user's favorite recipe</a></li>
                    </ul>
                    <div className="back__button">
                        <a href="/">Back to Home Page</a>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Maintenance;