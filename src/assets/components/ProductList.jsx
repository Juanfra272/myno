import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductList = ({ addToCart }) => {
    const [quantities, setQuantities] = useState({})
    
    const products = [
      {
        id: 1,
        name: 'Arroz Premium 50kg',
        price: 25.99,
        wholesalePrice: 22.99,
        description: 'Arroz de grano largo, calidad premium para negocios',
        stock: 120,
        minQuantity: 10,
        wholesaleMin: 50,
        image: 'https://www.superlineas.co/wp-content/uploads/2022/04/arroz-blanco-50kg.jpg',
        unitType: 'sacos'
      },
      {
        id: 2,
        name: 'Aceite Vegetal 20L',
        price: 35.50,
        wholesalePrice: 32.00,
        description: 'Aceite vegetal puro, ideal para restaurantes',
        stock: 75,
        minQuantity: 5,
        wholesaleMin: 20,
        image: 'https://http2.mlstatic.com/D_NQ_NP_978042-MLU69794312910_062023-O.webp',
        unitType: 'bidones'
      },
      {
        id: 3,
        name: 'Azúcar Refinada 25kg',
        price: 18.75,
        wholesalePrice: 16.50,
        description: 'Azúcar blanca refinada, saquete por 25kg',
        stock: 200,
        minQuantity: 10,
        wholesaleMin: 40,
        image: 'https://alvicl.vtexassets.com/arquivos/ids/161315/000000000000665340-UN-01.jpg?v=638255548087800000',
        unitType: 'sacos'
      },
      {
        id: 4,
        name: 'Harina de Trigo 40kg',
        price: 22.30,
        wholesalePrice: 20.00,
        description: 'Harina de trigo para panificación, saco 40kg',
        stock: 90,
        minQuantity: 5,
        wholesaleMin: 25,
        image: 'https://ricardoteransl.es/wp-content/uploads/2022/01/harina-4-1200x1200.jpg.webp',
        unitType: 'sacos'
      }
    ]
  
    const handleQuantityChange = (productId, value) => {
      const numericValue = parseInt(value) || 0
      const minQuantity = products.find(p => p.id === productId)?.minQuantity || 1
      setQuantities({
        ...quantities,
        [productId]: Math.max(minQuantity, numericValue)
      })
    }
  
    const handleAddToCart = (product) => {
      const quantity = quantities[product.id] || product.minQuantity
      if (quantity < product.minQuantity) {
        alert(`La cantidad mínima de compra es ${product.minQuantity} ${product.unitType}`)
        return
      }
      
      addToCart({
        ...product,
        quantity,
        finalPrice: quantity >= product.wholesaleMin ? product.wholesalePrice : product.price
      })
    }
  
    return (
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold border-b pb-2">Productos Mayoristas</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => {
            const quantity = quantities[product.id] || product.minQuantity
            const isWholesale = quantity >= product.wholesaleMin
            
            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-full h-50 overflow-hidden flex items-center justify-center bg-gray-100 p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-[200px] h-[200px] object-contain"
                  />
                </div>
                
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-blue-800 line-clamp-1">{product.name}</h2>
                  <p className="text-gray-600 mb-3 line-clamp-2 h-[40px]">{product.description}</p>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad ({product.unitType}):
                    </label>
                    <input
                      type="number"
                      min={product.minQuantity}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo: {product.minQuantity} {product.unitType}
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <div className={`font-bold text-lg ${isWholesale ? 'text-green-600' : 'text-blue-600'}`}>
                      ${isWholesale ? product.wholesalePrice : product.price} / {product.unitType.slice(0, -1)}
                      {isWholesale && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          MAYORISTA
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      Total: ${((isWholesale ? product.wholesalePrice : product.price) * quantity).toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.stock > 50 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      Stock: {product.stock} {product.unitType}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  
  export default ProductList