import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { RestaurantProvider } from './providers/RestaurantContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RestaurantProvider>
        <App />
      </RestaurantProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
