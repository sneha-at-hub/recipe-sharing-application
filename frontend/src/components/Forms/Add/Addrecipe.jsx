import React, { useState, useEffect } from "react";
import axios from "axios";
import Description from "../../Description/Description";
import "./Addrecipe.css";
import Dropdown from "../../Dropdown/Dropdown";

const Addrecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ingredients: '',
    overview: '',
    description: '',
    category: '', // Change this to hold category ID
    prepTime: '',
    additionalTime: '',
    totalTime: '',
    servings: '',
    yieldAmount: '',
    cookingTime: '',
  });
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch user data (mock function)
  const fetchUserData = async () => {
    // Replace with your actual API call
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No access token found');

      const response = await axios.get('http://127.0.0.1:8000/api/user-from-token/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserId(response.data.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setImage(null);
      alert('Please select a valid image file.');
    }
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      category: category.id, // Store the category ID in formData
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('ingredient', formData.ingredients);
    data.append('description', formData.overview);
    data.append('detailed_description', formData.description);
    data.append('category', formData.category); // Send the category ID
    data.append('prep_time', formData.prepTime);
    data.append('additional_time', formData.additionalTime);
    data.append('total_time', formData.totalTime);
    data.append('servings', formData.servings);
    data.append('yield_amount', formData.yieldAmount);
    data.append('cooking_time', formData.cookingTime);

    if (image) {
      data.append('image', image);
    }

    if (userId) {
      data.append('user', userId);
    } else {
      console.error('User ID is not available');
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No access token found in local storage');

      const response = await axios.post('http://127.0.0.1:8000/api/recipes/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Recipe added successfully:', response.data);
      setSuccessMessage('Recipe added successfully!');
    } catch (error) {
      console.error('Error uploading recipe:', error.response?.data || error.message);
      setErrorMessage('Failed to add recipe.');
    }
  };
  return (
    <div className="addrecipe-container">
      <div className="form-container">
        <h1 className="h1-addrecipe">Add Recipes</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter the recipe title"
            />
          </div>

          {/* Subtitle */}
          <div className="form-group">
            <label htmlFor="subtitle" className="form-label">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              className="form-input"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Enter the subtitle"
            />
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            <textarea
              id="ingredients"
              className="form-input"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Enter the ingredients"
            />
          </div>

          {/* Overview */}
          <div className="form-group">
            <label htmlFor="overview" className="form-label">Overview</label>
            <textarea
              id="overview"
              className="form-input"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Enter a brief overview"
            />
          </div>

          {/* Detailed Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Detailed Description</label>
            <Description
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <Dropdown value={formData.category} onChange={handleCategoryChange} />
          </div>
          {/* Prep Time */}
          <div className="form-group">
            <label htmlFor="prepTime" className="form-label">Prep Time</label>
            <input
              type="text"
              id="prepTime"
              className="form-input"
              value={formData.prepTime}
              onChange={handleChange}
              placeholder="Enter preparation time"
            />
          </div>

          {/* Additional Time */}
          <div className="form-group">
            <label htmlFor="additionalTime" className="form-label">Additional Time</label>
            <input
              type="text"
              id="additionalTime"
              className="form-input"
              value={formData.additionalTime}
              onChange={handleChange}
              placeholder="Enter additional time"
            />
          </div>

          {/* Total Time */}
          <div className="form-group">
            <label htmlFor="totalTime" className="form-label">Total Time</label>
            <input
              type="text"
              id="totalTime"
              className="form-input"
              value={formData.totalTime}
              onChange={handleChange}
              placeholder="Enter total time"
            />
          </div>

          {/* Servings */}
          <div className="form-group">
            <label htmlFor="servings" className="form-label">Servings</label>
            <input
              type="text"
              id="servings"
              className="form-input"
              value={formData.servings}
              onChange={handleChange}
              placeholder="Enter number of servings"
            />
          </div>

          {/* Yield Amount */}
          <div className="form-group">
            <label htmlFor="yieldAmount" className="form-label">Yield Amount</label>
            <input
              type="text"
              id="yieldAmount"
              className="form-input"
              value={formData.yieldAmount}
              onChange={handleChange}
              placeholder="Enter yield amount"
            />
          </div>

          {/* Cooking Time */}
          <div className="form-group">
            <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
            <input
              type="text"
              id="cookingTime"
              className="form-input"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="Enter cooking time"
            />
          </div>

          {/* Image */}
          <div className="form-group">
            <label htmlFor="image" className="form-label">Recipe Image</label>
            <input
              type="file"
              id="image"
              className="form-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="add-recipe-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addrecipe;
