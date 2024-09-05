import { useState, useEffect } from "react";
import "./FoodItem.css";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons

const FoodItem = ({ id, name, ratings, description, image, time, user }) => {
  // State to manage whether the heart is filled or not
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [jwtUserId, setJwtUserId] = useState(null);

  // Toggle the heart icon state
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // Parse the JWT token from local storage to get user ID
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Decode the JWT token (it's Base64 encoded)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(atob(base64));
      
      // Set the user ID from the decoded token
      setJwtUserId(decodedPayload.user_id);
    }
  }, []);

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
          <VscHeartFilled className="add" onClick={handleHeartClick} />
        ) : (
          <VscHeart className="add" onClick={handleHeartClick} />
        )}

        {/* Conditionally render the CiEdit icon if the user matches the ID from the JWT */}
        {jwtUserId === user && <CiEdit className="checking" />}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-time-container">
          <IoMdTime className="time" />
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
