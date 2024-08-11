import './Navbar.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [hovered, setHovered] = useState(null);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    }
  return (
    <>
    <div className="all">
    <div className="first-nav">

<img src={assets.logo} alt="Logo" className='logo' />

<div className="searchbar">
    <div id="select" onClick={toggleDropdown}>
        <p>{selectedCategory}</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="#4a4a4a" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9l6 6l6-6"></path></svg>
        <ul             style={{
      maxHeight: isDropdownOpen ? '300px' : '0',
      overflowY: 'auto',
      transition: 'max-height 0.3s ease-in-out',
    }}>
            <li className="options" onClick={() => handleCategorySelect('All Categories')}>All Categories</li>
            <li className="options" onClick={() => handleCategorySelect('Dinner')}>Dinner</li>
            <li className="options" onClick={()=> handleCategorySelect('Breakfast')}>Breakfast</li>
            <li className="options" onClick={() => handleCategorySelect('Meal')}>Meal</li>
            <li className="options" onClick={()=> handleCategorySelect('Lunch')}>Lunch</li>
            <li className="options" onClick={()=> handleCategorySelect('Diet Meal')}>Diet Meal</li>
        </ul>
    </div>


    <input type="text" placeholder='Search Recipes' />


    <div className="icon">
      
        <img src={assets.search} alt="" className='searchpng' />
    </div>
</div>

<div className='buttons' style={{ display: 'flex', alignItems: 'center' }}>
      <button style={{ marginRight: '10px' }} className='login-btn'>Login</button>
      <span style={{ marginRight: '10px', fontSize:'24px', color:'#ccc' }}>|</span>
      <button className='signin-btn'>Signin</button>
    </div>
</div>

    </div>

    <div className="all-second">
    <div className='navbar'>
      <ul className="navbar-menu">
        
        <li>Meals</li>
        <li>Dinner</li>
        <li>Cuisines</li>
        <li>About Us</li>
      </ul>

      <div className="navbar-right">
      <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
        <li
          style={{
            position: 'relative',
            padding: '0 20px',
            borderRight: '1px solid #ccc',
            paddingBottom: '5px', // Adjust padding as needed
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHovered('Grocery List')}
          onMouseLeave={() => setHovered(null)}
        >
          Grocery List
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 20,
            width: hovered === 'Grocery List' ? '40%' : '0%',
            height: '4px', // Adjust height as needed
            backgroundColor: 'red', // Adjust color as needed
            borderRadius: '12px', // Add bottom-right and bottom-left radius
            opacity: hovered === 'Grocery List' ? 1 : 0, // Make the underline visible on hover
            transition: 'width 0.2s ease-out, opacity 0.2s ease-out' // Smooth transition
          }}></div>
        </li>
        <li
          style={{
            position: 'relative',
            padding: '0 20px',
            borderRight: '1px solid #ccc',
            paddingBottom: '5px', // Adjust padding as needed
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHovered('Add Recipe')}
          onMouseLeave={() => setHovered(null)}
        >
          Add Recipe
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 20,
            width: hovered === 'Add Recipe' ? '40%' : '0%',
            height: '4px', // Adjust height as needed
            backgroundColor: 'red', // Adjust color as needed
            borderRadius: '12px', // Add bottom-right and bottom-left radius
            opacity: hovered === 'Add Recipe' ? 1 : 0, // Make the underline visible on hover
            transition: 'width 0.2s ease-out, opacity 0.2s ease-out' // Smooth transition
          }}></div>
        </li>
        <li
          style={{
            position: 'relative',
            padding: '0 20px',
            paddingBottom: '5px', // Adjust padding as needed
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHovered('Recipe Box')}
          onMouseLeave={() => setHovered(null)}
        >
          Recipe Box
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 20,
            width: hovered === 'Recipe Box' ? '40%' : '0%',
            height: '4px', // Adjust height as needed
            backgroundColor: 'red', // Adjust color as needed
            borderRadius: '12px', // Add bottom-right and bottom-left radius
            opacity: hovered === 'Recipe Box' ? 1 : 0, // Make the underline visible on hover
            transition: 'width 0.2s ease-out, opacity 0.2s ease-out' // Smooth transition
          }}></div>
        </li>
      </ul>
    </div>
    </div>

    </div>


    </>
  );
};

export default Navbar;
