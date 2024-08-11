import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  return (
    <>
    <div className="first-nav">

        <img src={assets.logo} alt="Logo" className='logo' />

        <div className="searchbar">
            <input type="text" />
            <div className="icon">
                <img src={assets.search} alt="" className='searchpng' />
            </div>
        </div>

        <div className="buttons">
            <button className='login-btn'>Login</button>
            <button className='signin-btn'>Signin</button>
        </div>
    </div>
    <div className='navbar'>
      <img src={assets.logo} alt="Logo" className='logo' />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>
        <li>Movile-app</li>
        <li>Contact Us</li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot">

            </div>
            
        </div>
        <button>sign in</button>

      </div>
    </div>
    </>
  );
};

export default Navbar;
