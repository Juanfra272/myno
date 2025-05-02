import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

export const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await import('../data/product.json');
        // Asegurar que las rutas sean absolutas
        const processedProducts = (response.default || response).map(product => ({
          ...product,
          image: new URL(product.image, import.meta.url).href
        }));
        setProducts(processedProducts);
      } catch (error) {
        console.error("Error cargando productos:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="text-center pt-8">Cargando productos...</div>;
  if (products.length === 0) return <div className="text-center pt-8">No hay productos disponibles</div>;

  return (
    <div className="flex justify-center pt-16">
      <div className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {products.map((product) => (
            <div key={product.id} className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback a SVG si la imagen no carga
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTE5IDVIMWEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMThhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJ6bTAgMTZIMVY3aDE4djE0ek0xMSAxNUw1IDl2MTBoMTRWOWwtNiA2eiIvPjwvc3ZnPg==';
                    e.target.className = 'max-h-full max-w-full object-cover';
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                <div className="flex flex-col items-center space-y-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price.toLocaleString('es-CL')}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg text-md transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;