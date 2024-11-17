const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
// Create MySQL connection
const db = mysql.createConnection({
host: 'localhost',
user: 'marina',
password: 'Rucbar1!', // replace with your MySQL root password
database: 'mern_db',
});
db.connect(err => {
if (err) {
console.error('Database connection failed:', err.stack);
return;
}
console.log('Connected to MySQL database.');
});
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});
// Endpoint to get all favorited recipes by a specific user
app.get('/api/favorites', (req, res) => {
    const { userName } = req.query;

    if (!userName) {
        return res.status(400).json({ error: 'User name is required' });
    }

    const query = `
        SELECT f.favorite_id, r.title, f.user_id, f.recipe_id, f.favorite_id, f.favorite_date
        FROM Favorite f
        JOIN Recipe r ON f.recipe_id = r.recipe_id
        JOIN User u ON f.user_id = u.user_id
        WHERE u.name = ?`;

    db.query(query, [userName], (err, results) => {
        if (err) {
            console.error('Error fetching favorites:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});
// Endpoint to get details of a specific favorited recipe
app.get('/api/favorite/:favoriteId', (req, res) => {
    const { favoriteId } = req.params;

    const query = `
        SELECT r.title, r.description, r.cuisine_type, r.cooking_time, f.favorite_id
        FROM Favorite f
        JOIN Recipe r ON f.recipe_id = r.recipe_id
        WHERE f.favorite_id = ?`;

    db.query(query, [favoriteId], (err, results) => {
        if (err) {
            console.error('Error fetching favorite detail:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Favorite not found' });
        }
        res.json(results[0]);
    });
});

// Authentication Endpoint
app.post('/api/maintenance', (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Query to authenticate user with SHA2 hashed password
    const query = `
        SELECT username
        FROM Users
        WHERE username = ? AND password_hash = SHA2(?, 256)
    `;

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error during authentication query:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (results.length === 0) {
            console.log('Authentication failed for user:', username);
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Authentication successful
        console.log('Authentication successful for user:', username);
        res.json({ message: 'Authentication successful.' });
    });
});
