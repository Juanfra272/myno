import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header className="bbg-gray-800 text-white py-4 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
        {/* Nombre del sitio */}
        <div className="text-lg font-bold">
          <Link to="/">MYNO</Link>
        </div>

        {/* Sección de íconos alineados a la derecha */}
        <div className="flex gap-6 items-center">
          {/* Icono de perfil */}
          <Link to="/profile" className="flex items-center gap-2">
            <FaUser className="text-2xl" />
            <span>Perfil</span>
          </Link>

          {/* Icono de carrito */}
          <Link to="/cart" className="relative flex items-center gap-2">
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;