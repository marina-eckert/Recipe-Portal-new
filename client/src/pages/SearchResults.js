import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { favorites } = location.state || { favorites: [] };

    if (favorites.length === 0) {
        return <p>No favorites found for this user.</p>;
    }

    return (
        <div>
            <h2>Favorited Recipes</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.favorite_id}>
                        <Link to={`/favorite/${favorite.favorite_id}`}>
                            {favorite.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;