import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="Logo" className='logo'/>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Magnam, recusandae! Facere, cum placeat. Saepe ipsum facilis 
                  reprehenderit rem. Quae sapiente repellendus architecto.
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook" />
                    <img src={assets.twitter_icon} alt="Twitter" />
                    <img src={assets.linkedin_icon} alt="LinkedIn" />
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
            <div className="footer-content-right">
                <h2>Get in touch</h2>
                <ul>
                    <li>981825297342</li>
                    <li>contact@biterecipe.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            © {new Date().getFullYear()} Sneha Tamang. All rights reserved.
        </p>
    </div>
  )
}

export default Footer;
