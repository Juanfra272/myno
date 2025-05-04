import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import { ProductList } from './assets/components/ProductList';
import Cart from './assets/components/Cart';
import Profile from './assets/components/Profile';
import Checkout from './assets/pages/Checkout';
import Login from './assets/pages/Login';
import { CartProvider } from './assets/components/CartContext';
import { AuthProvider } from './assets/components/AuthContext';
import ProtectedRoute from './assets/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-black min-h-screen">
          <Router>
            <Header />
            <main className="container mx-auto p-4">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<ProductList />} />
                <Route path="/login" element={<Login />} />
                
                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>
              </Routes>
            </main>
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;