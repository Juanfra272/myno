import { useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { useState, useEffect } from 'react';
import productsData from '../data/product.json'; // Importamos directamente el JSON

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    setLoading(true);
    try {
      // Buscamos el producto en los datos importados
      const foundProduct = productsData.find(p => p.id === parseInt(id));
      
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.image);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600">Producto no encontrado</h2>
        <p className="mt-4">El producto que buscas no está disponible</p>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, Math.min(product.stock, newQuantity));
    setQuantity(qty);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Galería de imágenes */}
          <div className="md:w-1/2 p-6">
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTE5IDVIMWEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMThhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJ6bTAgMTZIMVY3aDE4djE0ek0xMSAxNUw1IDl2MTBoMTRWOWwtNiA2eiIvPjwvc3ZnPg==';
                }}
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {product.category}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                Stock disponible: {product.stock}
              </span>
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-6">
              ${product.price.toLocaleString('es-CL')}
            </p>

            {product.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Descripción</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Especificaciones */}
            {product.specs && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Especificaciones</h3>
                <ul className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="font-medium text-gray-800 mr-1">{key}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="flex items-center mb-8">
              <label className="mr-3 font-medium">Cantidad:</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón de compra */}
            <button
              onClick={() => {
                addToCart({
                  ...product,
                  quantity: quantity,
                  cartId: `${product.id}-${Date.now()}`
                });
                alert(`${quantity} ${product.name} agregado(s) al carrito`);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;