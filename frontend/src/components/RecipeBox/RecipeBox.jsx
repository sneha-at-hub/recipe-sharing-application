import React, { useState, useEffect } from "react";
import FoodItem from "../FoodItem/FoodItem";
import "./RecipeBox.css"; // Import the CSS for styling

const RecipeBox = () => {
    const [userFoods, setUserFoods] = useState([]);
    const [jwtUserId, setJwtUserId] = useState(null);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/recipes/'); // Replace with your API endpoint
                const data = await response.json();

                // Get the JWT token from local storage
                const token = localStorage.getItem("access_token");
                if (token) {
                    // Decode the JWT token
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const decodedPayload = JSON.parse(atob(base64));
                    setJwtUserId(decodedPayload.user_id);

                    // Filter foods based on the user_id
                    const filteredFoods = data.filter(food => food.user === decodedPayload.user_id);
                    setUserFoods(filteredFoods);
                }
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []);

    return (
        <div className="recipe-box">
            <h1>Your Recipe Box</h1>
            <div className="food-list">
                {userFoods.length > 0 ? (
                    userFoods.map(food => (
                        <FoodItem
                            key={food.id}
                            id={food.id}
                            name={food.title}
                            ratings={food.ratings}
                            description={food.description}
                            image={food.image}
                            time={food.cooking_time}
                            user={food.user}
                        />
                    ))
                ) : (
                    <p>No foods found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeBox;
