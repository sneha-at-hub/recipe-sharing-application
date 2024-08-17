import { useState } from 'react';
import './FoodItem.css';
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons including empty star

const FoodItem = ({ id, name, ratings, description, image,time }) => {
  // State to manage whether the heart is filled or not
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  // Toggle the heart icon state
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // Function to render stars based on ratings
  const renderStars = (ratings) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= ratings) {
        stars.push(<FaStar key={i} className="star" />); // Full star
      } else if (i === Math.ceil(ratings) && ratings % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="star" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} className="star" />); // Empty star
      }
    }

    return stars;
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
        <div className="food-item-time-container">
        <IoMdTime className='time' />
        <p className="food-item-time">{time}</p>
        </div>
        <div className="one-div">
          <div className="food-item-stars">
            {renderStars(ratings)} {/* Render the stars based on ratings */}
          </div>
          <p className="food-item-ratings">{ratings} Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
