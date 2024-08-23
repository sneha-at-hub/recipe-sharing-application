import React from 'react';
import './Detail.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets';

function Detail() {
    return (
        <div className="recipe-card">
            <div className="breadcrumb">
                <a href="#">Recipes</a> &gt; 
                <a href="#"> Meat and Poultry</a> &gt; 
                <a href="#"> Chicken</a> &gt; 
                <a href="#"> Fried Chicken Recipes</a>
            </div>

            <div className="seperating-detail">
            <div className="main-detail">
            <h2 className='detail-heading'>Chef John's Buttermilk Fried Chicken</h2>
            <div className="ratings">
                <div className="box">
                <span className="stars">⭐⭐⭐⭐</span>
                <span className="rating-value">4.5</span>
                <span className="reviews-item">(493)</span>
                </div>
                <div className="box">
                <span className="reviews">375 Reviews</span>
                </div>

                <div className="box">
                <span className="photos">84 Photos</span>

                </div>
            </div>
            <div className="imgtag">
                
                <p className="description">
                    Buttermilk fried chicken that's incredibly tender, thanks to tangy buttermilk.
                    After the buttermilk soak, dredge the chicken pieces in seasoned flour and fry 
                    them in hot oil until crisp and golden.
                </p>
            </div>

            </div>
            <div className="image">
                <img src={assets.food_1} alt="Fried Chicken" />
            </div>

            </div>



            <div className="author">
                <span>By <strong>Sneha Tamang</strong></span>
                <span>Updated on July 1, 2024</span>
            </div>

            <div className="buttons">
                <button className="btn save">Save ❤️</button>
                <button className="btn rate">Rate ⭐</button>
                <button className="btn print">Print 🖨</button>
                <button className="btn share">Share 🔄</button>
            </div>

        </div>
    );
}

export default Detail;
