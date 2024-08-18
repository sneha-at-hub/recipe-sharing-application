import './Footer.css';
import { assets } from '../../assets/assets';
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.logo} alt="Logo" className='logo'/>
            <p>
                Turn everyday meals into something special with Bite's easy, flavorful recipes.
            </p>
            <h2 style={{marginBottom:'-10px'}}>Subscribe our newsletter!</h2>
                <div className="newsletter">

                <input type="text" placeholder='example@gmail.com' className='newletterinput'/>
                <button className="newsletter-btn">Subcribe</button>

                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Meals</li>
                    <li>Privacy Policy</li>
                    
                </ul>
            </div>
            <div className="footer-content-corner">
                <h2>Recipe</h2>
                <ul>
                    <li>Meals</li>
                    <li>Dinner</li>
                    <li>Cuisines</li>
                    <li>Grocery List</li>
                    <li>Add Recipe</li>
                    <li>Recipe Box</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>981825297342</li>
                    <li>contact@biterecipe.com</li>
                </ul>
            </div>
        </div>
        <hr />
                <div className="footer-social-icons">
                <FaFacebook className='icon'/>
                <FaInstagram className='icon' />
                <FaXTwitter className='icon' />

                </div>
        <hr />
        <p className="footer-copyright">
            © {new Date().getFullYear()} Sneha Tamang. All rights reserved.
        </p>
    </div>
  )
}

export default Footer;
