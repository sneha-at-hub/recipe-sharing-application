import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [selectedCategory, setSelectedCategory] = useState("Select Category"); // State for selected category

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsOpen(false); // Close the dropdown after selection
  };

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
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Item 1")}
            >
              Item 1
            </li>
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Item 2")}
            >
              Item 2
            </li>
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Item 3")}
            >
              Item 3
            </li>
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Item 4")}
            >
              Item 4
            </li>
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Lunch")}
            >
              Lunch
            </li>
            <li
              className="custom-dropdown-option"
              onClick={() => handleCategorySelect("Item Meal")}
            >
              Item Meal
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
