import React from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import Description from '../../Description/Description';
import './Addrecipe.css'; // Import a CSS file for styling

const Addrecipe = () => {
  return (
    <div className="addrecipe-container">
 
      <div className="form-container">
      <h1 className='h1-addrecipe'>Add Recipes</h1>
        {/* Title */}
        <div className="form-group">
          <label htmlFor="recipe-title" className="form-label">Title</label>
          <input type="text" id="recipe-title" className="form-input" placeholder="Enter the recipe title" />
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label htmlFor="recipe-subtitle" className="form-label">Subtitle</label>
          <input type="text" id="recipe-subtitle" className="form-input" placeholder="Enter a brief subtitle" />
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <label htmlFor="recipe-ingredients" className="form-label">Ingredients</label>
          <textarea id="recipe-ingredients" className="form-textarea" placeholder="List ingredients here..." />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="recipe-description" className="form-label">Description</label>
          <Description />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="recipe-category" className="form-label">Category</label>
          <Dropdown />
        </div>

        <div className="flex-group">
          {/* Prep Time */}
          <div className="form-group">
            <label htmlFor="recipe-prep-time" className="form-label">Preparation Time</label>
            <input type="text" id="recipe-prep-time" className="form-input" placeholder="E.g., 20 minutes" />
          </div>

          {/* Additional Time */}
          <div className="form-group">
            <label htmlFor="recipe-additional-time" className="form-label">Additional Time</label>
            <input type="text" id="recipe-additional-time" className="form-input" placeholder="E.g., 10 minutes" />
          </div>
        </div>

        <div className="flex-group">
          {/* Total Time */}
          <div className="form-group">
            <label htmlFor="recipe-total-time" className="form-label">Total Time</label>
            <input type="text" id="recipe-total-time" className="form-input" placeholder="E.g., 30 minutes" />
          </div>

          {/* Servings */}
          <div className="form-group">
            <label htmlFor="recipe-servings" className="form-label">Servings</label>
            <input type="text" id="recipe-servings" className="form-input" placeholder="E.g., 4 servings" />
          </div>
        </div>

        <div className="flex-group">
          {/* Yield */}
          <div className="form-group">
            <label htmlFor="recipe-yield" className="form-label">Yield</label>
            <input type="text" id="recipe-yield" className="form-input" placeholder="E.g., 1 loaf" />
          </div>

          {/* Cooking Time */}
          <div className="form-group">
            <label htmlFor="recipe-cooking-time" className="form-label">Cooking Time</label>
            <input type="text" id="recipe-cooking-time" className="form-input" placeholder="E.g., 45 minutes" />
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label htmlFor="recipe-image" className="form-label">Recipe Image</label>
          <input type="file" id="recipe-image" className="form-input" accept="image/*" />
        </div>

        <button className="add-recipe-button">Add Recipe</button>
      </div>
    </div>
  );
}

export default Addrecipe;
