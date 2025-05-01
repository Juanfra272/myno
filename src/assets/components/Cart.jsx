import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    addToCart
  } = useCart();

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 max-w-2xl mx-auto border border-gray-700">
      <h1 className="text-2xl font-bold text-center mb-6">CARRITO DE COMPRAS</h1>

      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded inline-block"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-700">
            {cart.map(item => (
              <div key={item.cartId} className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                      e.target.className = 'w-16 h-16 object-contain bg-gray-200 rounded';
                    }}
                  />
                  <div>
                    <p className="font-medium text-white">{item.name}</p>
                    {item.size && <p className="text-sm text-gray-400">Talla: {item.size}</p>}
                    <div className="flex items-center mt-1">
                      <button 
                        onClick={() => updateQuantity(
                          item.cartId, 
                          (item.quantity || 1) - 1
                        )}
                        className="text-gray-400 hover:text-white px-2"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity(
                          item.cartId, 
                          (item.quantity || 1) + 1
                        )}
                        className="text-gray-400 hover:text-white px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-green-500">
                    ${(item.price * (item.quantity || 1)).toLocaleString('es-CL')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Eliminar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-xl text-green-500">
                ${cartTotal.toLocaleString('es-CL')}
              </span>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors"
              >
                VACIAR CARRITO
              </button>
              <Link
                to="/checkout"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors text-center"
              >
                FINALIZAR COMPRA
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;