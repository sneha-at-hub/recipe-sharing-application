import './Home.css';

import Explore from '../../components/ExploreMenu/Explore';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import { useState } from 'react';
import Popular from '../../components/Popular/Popular';
import Header from '../../components/Header/Header';
import Grocery from '../../components/GroceryList/Grocery';


const Home = () => {
    const [category, setCategory] = useState("All");

    return (
        <div className="home-container">
            <RecipeCard category={category} setCategory={setCategory}/>
            <Explore/>
            <Grocery />
            <Popular />
            <Header />

         
            
    
            
        </div>
    );
};

export default Home;
