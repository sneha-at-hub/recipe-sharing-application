import React, { useState } from 'react';
import './FoodItem.css';
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";
import { assets } from '../../assets/assets'; // Ensure the path and assets structure are correct

const FoodItem = ({ id, name, ratings, description, image }) => {
  // State to manage whether the heart is filled or not
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // Toggle the heart icon state
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
        {isHeartFilled ? (
          <VscHeartFilled className='add' onClick={handleHeartClick} />
        ) : (
          <VscHeart className='add' onClick={handleHeartClick} />
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="one-div">
          <img src={assets.rating_starts} alt="Rating stars" />
          <p className="food-item-ratings">{ratings} Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
