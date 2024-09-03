
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider, { StoreContext } from './context/StoreContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <SearchProvider> {/* Wrap with SearchProvider */}
        <App />
      </SearchProvider>
    </StoreContextProvider> 
  </BrowserRouter>
);