import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { cartCount } = useContext(CartContext); // Usa cartCount en lugar de cart

  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Nombre del sitio */}
        <div className="text-lg font-bold">
          <Link to="/">MYNO</Link>
        </div>

        {/* Sección de íconos */}
        <div className="flex gap-6 items-center">
          {/* Icono de perfil */}
          <Link to="/profile" className="flex items-center gap-2">
            <FaUser className="text-2xl" />
            <span>Perfil</span>
          </Link>

          {/* Icono de carrito - usa cartCount */}
          <Link to="/cart" className="relative flex items-center gap-2">
            <FaShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;