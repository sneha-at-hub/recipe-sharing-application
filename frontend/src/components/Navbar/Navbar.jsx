import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [hovered, setHovered] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/recipeadd") {
      setActiveItem("Add Recipe");
    }
    else if(location.pathname == "/grocery-list"){
      setActiveItem("Grocery List");

    } 
    else {
      setActiveItem(null);
    }
  }, [location.pathname]);

  const handleMouseEnter = () => {
    setIsDropdownOpen2(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen2(false);
  };
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to /login
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // or however you store the token
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:8000/api/user-from-token/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("User data fetched:", response.data); // Debugging line
        setUserName(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (item) => {
    setActiveItem(item);
    if (item === "Add Recipe") {
      navigate("/recipeadd"); // Navigate to /recipeadd
    } else if (item === "Home") {
      navigate("/");
    } else if (item =="Grocery List"){
      navigate("/grocery-list")
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };
  return (
    <>
      <div className="final">
        <div className="all">
          <div className="first-nav">
            <img src={assets.logo} alt="Logo" className="logo1" />

            <div className="searchbar">
              <div id="select" onClick={toggleDropdown}>
                <p>{selectedCategory}</p>
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
                <ul
                  style={{
                    maxHeight: isDropdownOpen ? "300px" : "0",
                    overflowY: "auto",
                    transition: "max-height 0.3s ease-in-out",
                  }}
                >
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("All Categories")}
                  >
                    All Categories
                  </li>
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("Dinner")}
                  >
                    Dinner
                  </li>
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("Breakfast")}
                  >
                    Breakfast
                  </li>
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("Meal")}
                  >
                    Meal
                  </li>
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("Lunch")}
                  >
                    Lunch
                  </li>
                  <li
                    className="options"
                    onClick={() => handleCategorySelect("Diet Meal")}
                  >
                    Diet Meal
                  </li>
                </ul>
              </div>

              <input type="text" placeholder="Search Recipes" />
              <div className="icon">
                <img src={assets.search} alt="" className="searchpng" />
              </div>
            </div>

            <div
              className="buttons"
              style={{ display: "flex", alignItems: "center" }}
            >
              {userName && location.pathname !== "/login" ? (
                <>
                  <HiOutlineUserCircle className="icon-profile" />
                  <p
                    style={{
                      marginRight: "20px",
                      fontSize: "20px",
                      color: "#1E201E",
                    }}
                  >
                    <span>Welcome</span> {userName}!
                  </p>
                </>
              ) : (
                <>
                  <button
                    style={{ marginRight: "10px" }}
                    className="login-btn"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                  <span
                    style={{
                      marginRight: "10px",
                      fontSize: "24px",
                      color: "#3C3D37",
                    }}
                  >
                    |
                  </span>
                  <button className="signin-btn">Signup</button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="all-second">
          <div className="navbar">
            <ul className="navbar-menu">
              <li
                className={`val ${
                  activeItem === "Home" || location.pathname === "/"
                    ? "active"
                    : ""
                }`}
                onClick={() => handleClick("Home")}
              >
                Home
              </li>
              <li
                className={`val ${activeItem === "Meals" ? "active" : ""}`}
                onClick={() => handleClick("Meals")}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Meals
                {isDropdownOpen2 && (
                  <ul className="dropdown">
                    <li onClick={() => handleCategorySelect("All Categories")}>
                      All Categories
                    </li>
                    <li onClick={() => handleCategorySelect("Dinner")}>
                      Dinner
                    </li>
                    <li onClick={() => handleCategorySelect("Breakfast")}>
                      Breakfast
                    </li>
                    <li onClick={() => handleCategorySelect("Meal")}>Meal</li>
                    <li onClick={() => handleCategorySelect("Lunch")}>Lunch</li>
                    <li onClick={() => handleCategorySelect("Diet Meal")}>
                      Diet Meal
                    </li>
                  </ul>
                )}
              </li>
              <li
                className={`val ${activeItem === "Dinner" ? "active" : ""}`}
                onClick={() => handleClick("Dinner")}
              >
                Dinner
              </li>
              <li
                className={`val ${activeItem === "Cuisines" ? "active" : ""}`}
                onClick={() => handleClick("Cuisines")}
              >
                Cuisines
              </li>
              <li
                className={`val ${activeItem === "About Us" ? "active" : ""}`}
                onClick={() => handleClick("About Us")}
              >
                About Us
              </li>
            </ul>

            <div className="navbar-right">
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                <li
                  style={{
                    position: "relative",
                    padding: "0 20px",
                    borderRight: "1px solid #ccc",
                    paddingBottom: "5px",
                    cursor: "pointer",
                    color:
                      activeItem === "Grocery List" ||
                      hovered === "Grocery List"
                        ? "red"
                        : "#0e0e0e", // Red text color on hover and active
                  }}
                  onMouseEnter={() => setHovered("Grocery List")}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleClick("Grocery List")}
                >
                  Grocery List
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 20,
                      width:
                        activeItem === "Grocery List" ||
                        hovered === "Grocery List"
                          ? "40%"
                          : "0%",
                      height: "4px",
                      backgroundColor: "red",
                      borderRadius: "12px",
                      opacity:
                        activeItem === "Grocery List" ||
                        hovered === "Grocery List"
                          ? 1
                          : 0,
                      transition: "width 0.2s ease-out, opacity 0.2s ease-out",
                    }}
                  ></div>
                </li>
                <li
                  style={{
                    position: "relative",
                    padding: "0 20px",
                    borderRight: "1px solid #ccc",
                    paddingBottom: "5px",
                    cursor: "pointer",
                    color:
                      activeItem === "Add Recipe" || hovered === "Add Recipe"
                        ? "red"
                        : "#0e0e0e", // Red text color on hover and active
                  }}
                  onMouseEnter={() => setHovered("Add Recipe")}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleClick("Add Recipe")}
                >
                  Add Recipe
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 20,
                      width:
                        activeItem === "Add Recipe" || hovered === "Add Recipe"
                          ? "40%"
                          : "0%",
                      height: "4px",
                      backgroundColor: "red",
                      borderRadius: "12px",
                      opacity:
                        activeItem === "Add Recipe" || hovered === "Add Recipe"
                          ? 1
                          : 0,
                      transition: "width 0.2s ease-out, opacity 0.2s ease-out",
                    }}
                  ></div>
                </li>
                <li
                  style={{
                    position: "relative",
                    padding: "0 20px",
                    paddingBottom: "5px",
                    cursor: "pointer",
                    color:
                      activeItem === "Recipe Box" || hovered === "Recipe Box"
                        ? "red"
                        : "#0e0e0e", // Red text color on hover and active
                  }}
                  onMouseEnter={() => setHovered("Recipe Box")}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleClick("Recipe Box")}
                >
                  Recipe Box
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 20,
                      width:
                        activeItem === "Recipe Box" || hovered === "Recipe Box"
                          ? "40%"
                          : "0%",
                      height: "4px",
                      backgroundColor: "red",
                      borderRadius: "12px",
                      opacity:
                        activeItem === "Recipe Box" || hovered === "Recipe Box"
                          ? 1
                          : 0,
                      transition: "width 0.2s ease-out, opacity 0.2s ease-out",
                    }}
                  ></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
