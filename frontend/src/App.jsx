import React, { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Meals from "./pages/Meals/Meals";
import Popular from "./components/Popular/Popular";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import Detail from "./pages/Detail/Detail";
import Addrecipeshere from "./pages/Recipes/Addrecipeshere";
import Demo from "./components/Description/Demo";
import Grocery from "./components/GroceryList/Grocery";
import Signup from "./pages/Signup/Signup";
import { SearchContext } from "./context/SearchContext";


const App = () => {
  const { searchQuery } = useContext(SearchContext); // Access searchQuery from context

  return (
    <>
      <div className="app">
        <Navbar />
        
        {/* Conditionally render Popular with a bottom margin if there is a search query */}
        {searchQuery ? (
          <div style={{ marginTop: "100px" }}>
            <Popular />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Meals" element={<Meals />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/recipeadd" element={<Addrecipeshere />} />
            <Route path="/Demo" element={<Demo />} />
            <Route path="/grocery-list" element={<Grocery />} />
          </Routes>
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;

