import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Header from './assets/components/Header';
import {ProductList} from './assets/components/ProductList';
import Cart from './assets/components/Cart';
import Profile from './assets/components/Profile';
import Checkout from './assets/pages/Checkout';
import { CartProvider } from './assets/components/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="bg-black min-h-screen">
        <Router>
          <Header />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;