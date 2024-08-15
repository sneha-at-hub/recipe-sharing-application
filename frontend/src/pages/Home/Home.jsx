
import './Home.css'

import Explore from '../../components/ExploreMenu/Explore'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { useState } from 'react'



const Home = () => {
    const [category, setCategory] = useState("All");
  return (
    <div>

        <RecipeCard category={category} setCategory={setCategory}/>
        <Explore/>
   

      
    </div>
  )
}

export default Home
