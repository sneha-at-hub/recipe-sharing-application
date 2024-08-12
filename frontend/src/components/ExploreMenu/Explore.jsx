import './Explore.css';
import { menu_list } from '../../assets/assets';

const Explore = () => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Our Highlights</h1>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => {
                return (
                    <div key={index} className='explore-menu-list-item'>
                        <img src={item.menu_image} alt={item.menu_name} />
                        <p>{item.menu_name}</p>
                    </div>   
                )
            })}
        </div>
    </div>
  );
}

export default Explore;
