import React, { useContext, useEffect, useState } from 'react';
import './Popular.css';
import FoodItem from '../FoodItem/FoodItem';
import { SearchContext } from '../../context/SearchContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Popular = () => {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { searchQuery } = useContext(SearchContext); // Get searchQuery from SearchContext

  useEffect(() => {
    // Fetch recipes from backend based on search query
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const url = searchQuery 
          ? `http://localhost:8000/api/recipes/?search=${encodeURIComponent(searchQuery)}` 
          : 'http://localhost:8000/api/recipes/';
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setRecipes(Array.isArray(data) ? data : [data]); // Ensure it's always an array
        } else {
          console.error('Failed to fetch recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchQuery]); // Dependency on searchQuery

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <div className="popular-container">
      <h1 className='head'>
        Popular Recipes <FontAwesomeIcon icon={faArrowRight} />
      </h1>
      <div className="popular-grid">
        {recipes.map((food) => (
          <FoodItem
            key={food.id}
            id={food.id}
            name={food.title}
            ratings={food.ratings}
            time={food.cooking_time}
            description={food.subtitle}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
