import React from 'react';
import Dropdown from '../../Dropdown/Dropdown';

const Addrecipe = () => {
  return (
    <div>
      <div className="form-container">
        {/* Title */}
        <label htmlFor="recipe-title" className="recipe-label title-label">Title</label>
        <input type="text" id="recipe-title" className="recipe-title" />

        {/* Subtitle */}
        <label htmlFor="recipe-subtitle" className="recipe-label subtitle-label">Subtitle</label>
        <input type="text" id="recipe-subtitle" className="recipe-subtitle" />

        {/* Description */}
        <label htmlFor="recipe-description" className="recipe-label description-label">Description</label>
        <textarea id="recipe-description" className="recipe-description" />

        {/* Ingredients */}
        <label htmlFor="recipe-ingredients" className="recipe-label ingredients-label">Ingredients</label>
        <textarea id="recipe-ingredients" className="recipe-ingredients" />

        {/* Category */}
        <label htmlFor="recipe-category" className="recipe-label category-label">Category</label>
        <Dropdown />

        {/* Prep Time */}
        <label htmlFor="recipe-prep-time" className="recipe-label prep-time-label">Preparation Time</label>
        <input type="text" id="recipe-prep-time" className="recipe-prep-time" />

        {/* Additional Time */}
        <label htmlFor="recipe-additional-time" className="recipe-label additional-time-label">Additional Time</label>
        <input type="text" id="recipe-additional-time" className="recipe-additional-time" />

        {/* Total Time */}
        <label htmlFor="recipe-total-time" className="recipe-label total-time-label">Total Time</label>
        <input type="text" id="recipe-total-time" className="recipe-total-time" />

        {/* Servings */}
        <label htmlFor="recipe-servings" className="recipe-label servings-label">Servings</label>
        <input type="text" id="recipe-servings" className="recipe-servings" />

        {/* Yield */}
        <label htmlFor="recipe-yield" className="recipe-label yield-label">Yield</label>
        <input type="text" id="recipe-yield" className="recipe-yield" />

        {/* Cooking Time */}
        <label htmlFor="recipe-cooking-time" className="recipe-label cooking-time-label">Cooking Time</label>
        <input type="text" id="recipe-cooking-time" className="recipe-cooking-time" />

        {/* Image Upload */}
        <label htmlFor="recipe-image" className="recipe-label image-label">Recipe Image</label>
        <input type="file" id="recipe-image" className="recipe-image" accept="image/*" />

      </div>
    </div>
  );
}

export default Addrecipe;
