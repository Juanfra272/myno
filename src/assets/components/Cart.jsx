const Cart = ({ items, onRemove, onClear }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-gray-900 text-white rounded-lg p-6 max-w-2xl mx-auto border border-gray-700">
      <h1 className="text-2xl font-bold text-center mb-6">CARRITO DE COMPRAS</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-4">Tu carrito está vacío</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-200">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-gray-900">${item.price.toLocaleString('es-CL')}</span>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Eliminar"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-xl text-green-600">${total.toLocaleString('es-CL')}</span>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={onClear}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-colors"
              >
                VACIAR CARRITO
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition-colors">
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;