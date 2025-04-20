const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard