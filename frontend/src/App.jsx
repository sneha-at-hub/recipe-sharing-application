
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Meals from './pages/Meals/Meals'


const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>

      < Route path='/' element={<Home/>} />
      < Route path='/Meals' element={<Meals/>} />
 

      </Routes>
      
    </div>
  )
}

export default App
