import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RestaurantProvider } from './providers/RestaurantContext.jsx'
import { CategoryProvider } from './providers/CategoryContext.jsx'
import { RecipeProvider } from './providers/RecipeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RestaurantProvider>
        <CategoryProvider>
          <RecipeProvider>
            <App />
          </RecipeProvider>
        </CategoryProvider>
      </RestaurantProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
