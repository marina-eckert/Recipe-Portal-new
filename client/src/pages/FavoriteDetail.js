import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FavoriteDetail = () => {
    const { favoriteId } = useParams();
    const [favoriteDetail, setFavoriteDetail] = useState(null);

    useEffect(() => {
        const fetchFavoriteDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/favorite/${favoriteId}`);
                setFavoriteDetail(response.data);
            } catch (error) {
                console.error('Error fetching favorite detail:', error);
            }
        };
        fetchFavoriteDetail();
    }, [favoriteId]);

    if (!favoriteDetail) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{favoriteDetail.title}</h2>
            <p><strong>Description:</strong> {favoriteDetail.description}</p>
            <p><strong>Cuisine:</strong> {favoriteDetail.cuisine_type}</p>
            <p><strong>Cooking Time:</strong> {favoriteDetail.cooking_time} minutes</p>
        </div>
    );
};

export default FavoriteDetail;