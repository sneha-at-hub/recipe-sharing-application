import './RecipeCard.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext, useRef } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const RecipeCard = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const foodDisplayRef = useRef(null);

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
        
        <IoIosArrowForward className='side' onClick={scrollRight} />
      </div>
    </>
  );
};

export default RecipeCard;
