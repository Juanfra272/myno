import { Link } from 'react-router-dom'

const Checkout = ({ cart, removeFromCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">MI Carrito</h1>
      
      <div className="md:flex gap-6">
        {/* Sección de productos */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen del Pedido</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                  Ver productos
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-[200px] h-[200px] object-contain p-4"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-xl">{item.name}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        <p className="text-sm text-gray-500 mt-2">Peso Neto: {item.unitType.replace('sacos', 'kg')}</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">Cantidad:</span>
                            <span className="bg-gray-100 px-3 py-1 rounded">{item.quantity}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${(item.finalPrice * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.finalPrice.toFixed(2)} c/u</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Botón eliminar */}
                      <div className="self-start md:self-center">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          aria-label="Eliminar producto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        
        {/* Información de envío */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Información de Envío</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded"
                  placeholder="Número de contacto"
                  required
                />
              </div>
            </div>
            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Dirección completa"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Instrucciones especiales para la entrega"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      
      {/* Resumen de compra */}
      <div className="md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Compra</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío:</span>
              <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button
            className={`w-full py-3 rounded-lg font-bold text-lg ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            disabled={cart.length === 0}
          >
            Proceder al Pago
          </button>
          
          {subtotal < 1000 && (
            <p className="text-sm text-center mt-4 text-gray-600">
              ¡Falta ${(1000 - subtotal).toFixed(2)} para envío gratis!
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
)
}

export default Checkout;