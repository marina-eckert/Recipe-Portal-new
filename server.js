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

// Middleware to log requests
app.use((req, res, next) => {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const url = req.originalUrl; 
    const method = req.method; 

    // Insert the log into the RequestLogs table
    const query = `INSERT INTO RequestLogs (ip_address, user_agent, request_url, request_method) 
                   VALUES (?, ?, ?, ?)`;

    db.query(query, [ip, userAgent, url, method], (err, result) => {
        if (err) {
            console.error('Error logging request:', err);
        }
    });

    next();
});

// Endpoint to get page access data
app.get('/api/logs/page-access', (req, res) => {
    const query = `
    SELECT request_url, COUNT(*) AS visit_count, 
       GROUP_CONCAT(DISTINCT ip_address) AS ip_addresses,
       timestamp AS access_date
FROM RequestLogs
GROUP BY request_url, timestamp
ORDER BY timestamp ASC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching page access data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});


// Endpoint to trigger error for testing
app.get('/test-error', (req, res, next) => {
    const error = new Error('This is a test error');
    next(error); 
});

// Error handling middleware
app.use((err, req, res, next) => {
    const ip = req.ip;
    const errorMessage = err.message; 

    // Insert the error into the ErrorLogs table
    const query = `INSERT INTO ErrorLogs (ip_address, error_message) 
                   VALUES (?, ?)`;

    db.query(query, [ip, errorMessage], (error, result) => {
        if (error) {
            console.error('Error logging the error:', error);
        }
    });

    res.status(500).send({ error: 'Internal server error' });
});

// Endpoint to get error logs
app.get('/api/logs/errors', (req, res) => {
    const query = `
    SELECT error_message, ip_address, timestamp 
    FROM ErrorLogs 
    ORDER BY timestamp DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching error logs:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});