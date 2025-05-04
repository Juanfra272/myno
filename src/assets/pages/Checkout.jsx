import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useAuth } from '../components/AuthContext';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


const Checkout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    cartTotal,
    clearCart
  } = useCart();
  
  const { addPurchase } = useAuth();
  
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    notes: ''
  });

  const shipping = cartTotal > 1000 ? 0 : 50;
  const total = cartTotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingInfo.name.trim()) errors.name = 'Nombre requerido';
    if (!shippingInfo.phone.trim()) errors.phone = 'Teléfono requerido';
    if (!shippingInfo.address.trim()) errors.address = 'Dirección requerida';
    if (!shippingInfo.city.trim()) errors.city = 'Ciudad requerida';
    if (!shippingInfo.region.trim()) errors.region = 'Región requerida';
    if (!shippingInfo.postalCode.trim()) errors.postalCode = 'Código postal requerido';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (cart.length === 0 || !validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        const purchase = {
          items: cart.map(item => ({
            product: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            size: item.size,
            image: item.image
          })),
          total: total,
          shippingInfo: shippingInfo,
          status: 'completed'
        };
        
        await addPurchase(purchase);
        setPaymentStatus('success');
        clearCart();
      } else {
        setPaymentStatus('failed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="container mx-auto p-4 max-w-6xl text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-6">Tu pedido ha sido procesado correctamente.</p>
          <Link 
            to="/profile" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
          >
            Ver mi perfil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">MI Carrito</h1>
      
      {paymentStatus === 'failed' && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>El pago no pudo ser procesado. Por favor intenta nuevamente.</p>
        </div>
      )}
      
      <div className="md:flex gap-6">
        {/* Sección de productos - Siempre visible */}
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen del Pedido</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <Link 
                  to="/" 
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
                >
                  Ver productos
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.cartId} className="border-b pb-6 last:border-b-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-[200px] h-[200px] object-contain p-4"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTE5IDVIMWEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMThhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJ6bTAgMTZIMVY3aDE4djE0ek0xMSAxNUw1IDl2MTBoMTRWOWwtNiA2eiIvPjwvc3ZnPg==';
                            e.target.className = 'max-h-full max-w-full object-cover';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-bold text-xl">{item.name || 'Producto sin nombre'}</h3>
                        <p className="text-gray-600 mt-1">{item.description || ''}</p>
                        {item.size && <p className="text-sm text-gray-500">Talla: {item.size}</p>}
                        {item.unitType && (
                          <p className="text-sm text-gray-500 mt-2">
                            Peso Neto: {item.unitType.replace('sacos', 'kg')}
                          </p>
                        )}
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center gap-4">
                            <span className="font-medium">Cantidad:</span>
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(item.cartId, (item.quantity || 1) - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                -
                              </button>
                              <span className="px-3">{item.quantity || 1}</span>
                              <button 
                                onClick={() => updateQuantity(item.cartId, (item.quantity || 1) + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${(item.price || 0).toFixed(2)} c/u
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="self-start md:self-center">
                        <button 
                          onClick={() => removeFromCart(item.cartId)}
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
        </div>
        
        {/* Sección de resumen y formulario */}
        <div className="md:w-1/3 space-y-6 sticky">
          {/* Resumen de compra */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Compra</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
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
              onClick={handlePayment}
              className={`w-full py-3 rounded-lg font-bold text-lg flex items-center justify-center ${
                cart.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
              disabled={cart.length === 0 || isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                'Proceder al Pago'
              )}
            </button>
            
            {cartTotal < 1000 && cart.length > 0 && (
              <p className="text-sm text-center mt-4 text-gray-600">
                ¡Falta ${(1000 - cartTotal).toFixed(2)} para envío gratis!
              </p>
            )}
          </div>
          
          {/* Información de envío */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Información de Envío</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Número de contacto"
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección*</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    formErrors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Dirección completa"
                />
                {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad*</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      formErrors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Región*</label>
                  <input
                    type="text"
                    name="region"
                    value={shippingInfo.region}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      formErrors.region ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.region && <p className="text-red-500 text-xs mt-1">{formErrors.region}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal*</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      formErrors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
                <textarea
                  name="notes"
                  value={shippingInfo.notes}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows="3"
                  placeholder="Instrucciones especiales para la entrega"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;