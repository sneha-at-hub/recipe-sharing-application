import React, { useState, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [selectedCategory, setSelectedCategory] = useState("Select Category"); // State for selected category
  const [categories, setCategories] = useState([]); // State to store fetched categories

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name); // Use the name field from the category object
    setIsOpen(false); // Close the dropdown after selection
  };

  // Fetch categories from the API
  useEffect(() => {
    // Replace with your actual API URL
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/categories/"); // Replace with your Django API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data); // Set fetched categories in state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div className="custom-dropdown-container">
      <div className="custom-dropdown-select" onClick={toggleDropdown}>
        <p className="custom-dropdown-selected">{selectedCategory}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#4a4a4a"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m6 9l6 6l6-6"
          ></path>
        </svg>
        {isOpen && (
          <ul
            className="custom-dropdown-menu"
            style={{ maxHeight: isOpen ? "300px" : "0" }}
          >
            {categories.map((category) => (
              <li
                key={category.id}
                className="custom-dropdown-option"
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
