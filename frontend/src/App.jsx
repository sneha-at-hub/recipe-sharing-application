
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Meals from './pages/Meals/Meals'
import Popular from './components/Popular/Popular'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Detail from './pages/Detail/Detail'


const App = () => {
  return (
    <>
    
    
    <div className='app'>
      <Navbar />

      <Routes>

      < Route path='/' element={<Home/>} />
      < Route path='/Meals' element={<Meals/>} />
      < Route path='/popular' element={<Popular/>} />
      < Route path='/login' element={<Login/>} />
      < Route path='/detail' element={<Detail/>} />
 

      </Routes>
      
    </div>
    <Footer />
    </>
  )
}

export default App
