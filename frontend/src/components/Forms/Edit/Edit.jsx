import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../Dropdown/Dropdown';
import Description from '../../Description/Description';
import './Edit.css';
import { useParams } from 'react-router-dom'; // To get the recipe ID from the URL

const Edit = () => {
  const { recipeId } = useParams(); // Get recipe ID from URL
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
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch user data, recipe data, and categories when the component is loaded
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

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

        setUserId(response.data.id); // Store user ID
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRecipeData = async () => {
      try {
        console.log('Recipe ID from useParams:', recipeId); // Check if recipeId is correctly received
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${recipeId}/`);
        const recipe = response.data;

        // Populate form fields with fetched recipe data
        setFormData({
          title: recipe.title,
          subtitle: recipe.subtitle,
          ingredients: recipe.ingredient,
          overview: recipe.description,
          description: recipe.detailed_description,
          category: recipe.category, // Assuming this is the category ID
          prepTime: recipe.prep_time,
          additionalTime: recipe.additional_time,
          totalTime: recipe.total_time,
          servings: recipe.servings,
          yieldAmount: recipe.yield_amount,
          cookingTime: recipe.cooking_time,
        });
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchCategories();
    fetchUserData();
    fetchRecipeData();
  }, [recipeId]);

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
    data.append('category', formData.category); // Send category ID
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
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found in local storage');
        return;
      }

      const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${recipeId}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Recipe updated successfully:', response.data);
      setSuccessMessage('Recipe updated successfully!');
    } catch (error) {
      console.error('Error updating recipe:', error.response?.data || error.message);
      setErrorMessage('Failed to update recipe.');
    }
  };

  return (
    <div className="overall-container">
            <div className="editrecipe-container">
      <div className="form-container">
        <h1 className="h1-editrecipe">Edit Recipe</h1>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
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
            <Dropdown
              value={categories.find(cat => cat.id === formData.category)?.name || ''}
              options={categories.map(category => category.name)} // Pass category names to Dropdown
              onChange={handleCategoryChange} // Use the handler function
            />
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
            {/* Yield Amount */}
            <div className="form-group">
              <label htmlFor="yieldAmount" className="form-label">Yield Amount</label>
              <input type="text" id="yieldAmount" className="form-input" value={formData.yieldAmount} onChange={handleChange} placeholder="E.g., 2 liters" />
            </div>

            {/* Cooking Time */}
            <div className="form-group">
              <label htmlFor="cookingTime" className="form-label">Cooking Time</label>
              <input type="text" id="cookingTime" className="form-input" value={formData.cookingTime} onChange={handleChange} placeholder="E.g., 25 minutes" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">Image</label>
            <input type="file" id="image" className="form-input" onChange={handleImageChange} />
          </div>

          <button type="submit" className="add-recipe-button">Update Recipe</button>
        </form>
      </div>
    </div>

    </div>

  );
};

export default Edit;
