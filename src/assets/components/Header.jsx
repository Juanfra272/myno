import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Logo que redirige al inicio (lista de productos) */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white hover:text-blue-300 transition-colors"
        >
          MYNO 
        </Link>

        {/* Sección de usuario */}
        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <div className="hidden md:block text-sm text-gray-300">
                Hola, {user.name || user.email.split('@')[0]}
              </div>
              
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                title="Mi perfil"
              >
                <FaUser className="text-xl" />
                <span className="hidden md:inline">Perfil</span>
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                title="Cerrar sesión"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="hidden md:inline">Salir</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaUser className="text-xl" />
              <span className="hidden md:inline">Ingresar</span>
            </Link>
          )}

          {/* Carrito con contador */}
          <Link 
            to="/cart" 
            className="relative flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            title="Carrito de compras"
          >
            <FaShoppingCart className="text-xl" />
            <span className="hidden md:inline">Carrito</span>
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;