import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./FoodItem.css";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons
import PropTypes from "prop-types";

const FoodItem = ({ id, name, ratings, description, image, time, user }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [jwtUserId, setJwtUserId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // PropTypes for type checking
  FoodItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ratings: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    user: PropTypes.number.isRequired,
  };

  // Toggle heart state
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  // Navigate to the edit page
  const handleEditClick = () => {
    navigate(`/edit-recipe/${id}`); // Navigate to the edit page using the recipe id
  };

  // Parse JWT to get user ID
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(atob(base64));
      setJwtUserId(decodedPayload.user_id);
    }
  }, []);

  // Render stars based on ratings
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
        {jwtUserId === user && (
          <CiEdit className="checking" onClick={handleEditClick} /> // Call handleEditClick when clicked
        )}
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
          <div className="food-item-stars">{renderStars(ratings)}</div>
          <p className="food-item-ratings">{ratings} Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
