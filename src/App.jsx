import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './assets/components/Header'
import Home from './assets/pages/Home'
import ProductDetail from './assets/pages/ProductDetail'
import Checkout from './assets/pages/Checkout'
import Profile from './assets/components/Profile'

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      return [...prevCart, product]
    })
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  return (
    <Router>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
      
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/profile" element={<Profile />} /> {/* Nueva ruta para el perfil */}
      </Routes>
    </Router>
  )
}

export default App