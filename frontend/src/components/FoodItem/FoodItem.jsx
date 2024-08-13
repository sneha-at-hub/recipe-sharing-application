import './FoodItem.css';
import { assets } from '../../assets/assets'; // Ensure the path and assets structure are correct

const FoodItem = ({ id, name, ratings, description, image }) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
        <img src={assets.add_icon_white} className='add' alt="" />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="one-div">
        <img src={assets.rating_starts} alt="Rating stars" />
        <p className="food-item-ratings">{ratings} Ratings </p>
        

        </div>
      </div>

    </div>
  );
};

export default FoodItem;
