import React, { useContext } from 'react';
import './Popular.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Popular = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="popular-container">
      <h1 className='head'>
      Popular Recipes <FontAwesomeIcon icon={faArrowRight} />
      </h1>
      <div className="popular-grid">
        {food_list.map((food) => (
          <FoodItem
            key={food.id}
            id={food.id}
            name={food.name}
            ratings={food.ratings}
            description={food.subtitle}
            image={food.image}
            
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
