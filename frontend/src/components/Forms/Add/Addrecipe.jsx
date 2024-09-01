import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../Dropdown/Dropdown';
import Description from '../../Description/Description';
import './Addrecipe.css';

const Addrecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ingredients: '',
    overview: '',
    description: '',
    category: '',
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
  const [userId, setUserId] = useState(null); // State for user ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/user-from-token/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('User data fetched:', response.data);
        setUserId(response.data.id); // Store user ID
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('ingredient', formData.ingredients);
    data.append('description', formData.overview);
    data.append('detailed_description', formData.description);
    data.append('category', formData.category);
    data.append('prep_time', formData.prepTime);
    data.append('additional_time', formData.additionalTime);
    data.append('total_time', formData.totalTime);
    data.append('servings', formData.servings);
    data.append('yield_amount', formData.yieldAmount);
    data.append('cooking_time', formData.cookingTime);

    if (image) {
      data.append('image', image);
    }

    // Ensure `user` field is added if required by the API
    if (userId) {
      data.append('user', userId); // Append user ID to form data
    } else {
      console.error('User ID is not available');
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found in local storage');
        return;
      }

      // Debug: log form data
      for (const pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

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
            <input type="text" id="title" className="form-input" value={formData.title} onChange={handleChange} placeholder="Enter the recipe title" />
          </div>

          {/* Subtitle */}
          <div className="form-group">
            <label htmlFor="subtitle" className="form-label">Subtitle</label>
            <input type="text" id="subtitle" className="form-input" value={formData.subtitle} onChange={handleChange} placeholder="Enter a brief subtitle" />
          </div>

          {/* Ingredients */}
          <div className="form-group">
            <label htmlFor="ingredients" className="form-label">Ingredients</label>
            <textarea id="ingredients" className="form-textarea" value={formData.ingredients} onChange={handleChange} placeholder="List ingredients here..." />
          </div>

          {/* Overview */}
          <div className="form-group">
            <label htmlFor="overview" className="form-label">Overview</label>
            <textarea id="overview" className="form-textarea" value={formData.overview} onChange={handleChange} placeholder="Introduce your recipe 'OVERVIEW'" />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <Description value={formData.description} onChange={(value) => setFormData({ ...formData, description: value })} />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <Dropdown value={formData.category} onChange={(value) => setFormData({ ...formData, category: value })} />
          </div>

          <div className="flex-group">
            {/* Prep Time */}
            <div className="form-group">
              <label htmlFor="prepTime" className="form-label">Preparation Time</label>
              <input type="text" id="prepTime" className="form-input" value={formData.prepTime} onChange={handleChange} placeholder="E.g., 20 minutes" />
            </div>

            {/* Additional Time */}
            <div className="form-group">
              <label htmlFor="additionalTime" className="form-label">Additional Time</label>
              <input type="text" id="additionalTime" className="form-input" value={formData.additionalTime} onChange={handleChange} placeholder="E.g., 10 minutes" />
            </div>
          </div>

          <div className="flex-group">
            {/* Total Time */}
            <div className="form-group">
              <label htmlFor="totalTime" className="form-label">Total Time</label>
              <input type="text" id="totalTime" className="form-input" value={formData.totalTime} onChange={handleChange} placeholder="E.g., 30 minutes" />
            </div>

            {/* Servings */}
            <div className="form-group">
              <label htmlFor="servings" className="form-label">Servings</label>
              <input type="text" id="servings" className="form-input" value={formData.servings} onChange={handleChange} placeholder="E.g., 4 servings" />
            </div>
          </div>

          <div className="flex-group">
            {/* Yield */}
            <div className="form-group">
              <label htmlFor="yieldAmount" className="form-label">Yield</label>
              <input type="text" id="yieldAmount" className="form-input" value={formData.yieldAmount} onChange={handleChange} placeholder="E.g., 1 loaf" />
            </div>

            {/* Cooking Time */}
            <div className="form-group">
              <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
              <input type="text" id="cookingTime" className="form-input" value={formData.cookingTime} onChange={handleChange} placeholder="E.g., 45 minutes" />
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image" className="form-label">Recipe Image</label>
            <input type="file" id="image" className="form-input" onChange={handleImageChange} accept="image/*" />
          </div>

          <button type="submit" className="add-recipe-button">Add Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default Addrecipe;
