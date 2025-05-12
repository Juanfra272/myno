import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import productsData from '../data/product.json';

export const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  useEffect(() => {
    setLoading(true);
    try {
      const processedProducts = productsData.map(product => ({
        ...product,
      }));
      setProducts(processedProducts);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['todos', ...new Set(products.map(p => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Barra de búsqueda más compacta y centrada */}
      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm ">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-auto">
            <select
              className="p-2 border rounded-lg bg-white w-full md:w-48"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resultados - Tarjetas centradas con ancho controlado */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No se encontraron productos</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('todos');
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Mostrar todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 justify-items-center flex justify-center pt-16">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <Link to={`/products/${product.id}`} className="block flex-grow">
                <div className="h-70 bg-gray-100 flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTE5IDVIMWEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMThhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJ6bTAgMTZIMVY3aDE4djE0ek0xMSAxNUw1IDl2MTBoMTRWOWwtNiA2eiIvPjwvc3ZnPg==';
                      e.target.className = 'h-16 w-16 object-contain';
                    }}
                  />
                </div>
              
                <div className="p-4 flex-grow">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{product.name}</h3>
                </div>
              </Link>
              
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price.toLocaleString('es-CL')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock} unidades
                    </p>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        ...product,
                        quantity: 1,
                        cartId: `${product.id}-${Date.now()}`
                      });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-lg flex items-center gap-1 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;