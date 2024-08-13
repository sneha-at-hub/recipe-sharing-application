import './RecipeCard.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const RecipeCard = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h1>
        Our Latest Recipes <FontAwesomeIcon icon={faArrowRight} />
      </h1>
      <div className="food-display-list">
        {food_list.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            ratings={item.ratings}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
