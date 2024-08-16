import React, { useContext } from 'react';
import './Popular.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext'; 

const Popular = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="popular-container">
      <h2>Popular Foods</h2>
      <div className="popular-grid">
        {food_list.map((food) => (
          <FoodItem
            key={food.id}
            id={food.id}
            name={food.name}
            ratings={food.ratings}
            description={food.description}
            image={food.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
