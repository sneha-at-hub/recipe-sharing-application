import React, { useContext, useRef, useState, useEffect } from 'react';
import './RecipeCard.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const RecipeCard = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const foodDisplayRef = useRef(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/recipes/');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);  // Assuming the data is an array of recipes
        } else {
          console.error('Failed to fetch recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []); 

  const scrollLeft = () => {
    if (foodDisplayRef.current) {
      const scrollableElement = foodDisplayRef.current.querySelector('.food-display-list');
      console.log('Scrolling left');
      scrollableElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (foodDisplayRef.current) {
      const scrollableElement = foodDisplayRef.current.querySelector('.food-display-list');
      console.log('Scrolling right');
      scrollableElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  

  return (
    <>
      <h1>
        Our Latest Recipes <FontAwesomeIcon icon={faArrowRight} />
      </h1>
      <div className="box">
        <IoIosArrowBack className='side' onClick={scrollLeft} />
        
        <div className='food-display' ref={foodDisplayRef}>
          <div className="food-display-list">
            {recipes.map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.title}
                description={item.subtitle}
                time = {item.cooking_time}
                ratings={item.ratings}
                image={item.image}
              />
            ))}
          </div>
        </div>
        
        <IoIosArrowForward className='side' onClick={scrollRight} />
      </div>
    </>
  );
};

export default RecipeCard;
