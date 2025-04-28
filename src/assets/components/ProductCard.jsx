
const ProductCard = ({ product, addToCart, imageSize = "w-full h-64 object-contain p-4 bg-white" }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700 transition-transform hover:scale-[1.02] w-full max-w-md mx-auto">
      {/* Enlace que envuelve la imagen */}
      <div className="relative h-64 overflow-hidden flex items-center justify-center bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className={imageSize} // Usamos la prop aquí
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Imagen+no+disponible';
            e.target.className = 'w-full h-full object-cover bg-gray-200';
          }}
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        {/* Enlace para el título */}
        <a href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-bold text-xl text-white mb-2">{product.name}</h3>
        </a>
        
        <p className="text-gray-400 text-sm mb-4">{product.category}</p>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold text-green-500">
            ${product.price.toLocaleString('es-CL')}
          </span>
        </div>
        
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors"
          onClick={() => addToCart(product)}
        >
          COMPRAR
        </button>
      </div>
    </div>
  )
}

export default ProductCard;