import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './assets/components/Header'
import ProductList from './assets/components/ProductList'
import Cart from './assets/components/Cart'
import Profile from './assets/components/Profile'
import { useContext } from 'react'
import { CartContext } from './assets/components/CartContext'

function App() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext)

  return (
    <div className="bg-black min-h-screen">
      <Router>
        <Header />
        <main className="p-4 container mx-auto">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  items={cart} 
                  onRemove={removeFromCart} 
                  onClear={clearCart} 
                />
              } 
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App