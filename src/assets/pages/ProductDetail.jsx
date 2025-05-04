import { Link } from 'react-router-dom'

const ProductDetail = () => {
  const products = [
    {
      id: 1,
      name: 'Arroz Premium 50kg',
      price: 25.99,
      description: 'Arroz de grano largo, calidad premium para negocios',
      stock: 120,
      minQuantity: 2
    },
    {
      id: 2,
      name: 'Aceite Vegetal 20L',
      price: 35.50,
      description: 'Aceite vegetal puro, ideal para restaurantes',
      stock: 75,
      minQuantity: 1
    },
    {
      id: 3,
      name: 'Azúcar Refinada 25kg',
      price: 18.75,
      description: 'Azúcar blanca refinada, saquete por 25kg',
      stock: 200,
      minQuantity: 2
    },
    {
      id: 4,
      name: 'Harina de Trigo 40kg',
      price: 22.30,
      description: 'Harina de trigo para panificación, saco 40kg',
      stock: 90,
      minQuantity: 1
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Productos Destacados</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-blue-800">{product.name}</h2>
              <p className="text-gray-600 mb-3">{product.description}</p>
              
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Stock: {product.stock}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 mb-3">
                Mínimo: {product.minQuantity} unidad{product.minQuantity > 1 ? 'es' : ''}
              </div>
              
              <Link 
                to={`/product/${product.id}`}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded transition-colors"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDetail;