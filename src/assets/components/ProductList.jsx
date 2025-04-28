import ProductCard from './ProductCard'
import { useContext } from 'react';
import { CartContext } from './CartContext';

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const products = [
    {
      id: 1,
      name: "Caja de Redbulls",
      category: "Energizantes (Redbull, Monster)",
      price: 15000,
      image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTQ2Y6OfAuFZjqFDnpJ56ukjVVCF-WqBleZ-GpmvOpoWNJj0mJzOvTdbQP8OnvdQydXt0IXgzW7YqhTrdXJGO9sjrbubRomYi9jr_qwyX-6egsDis3xJfnZxg" // URL completa
    },
    {
      id: 2,
      name: "Caja de Monsters",
      category: "Energizantes (Redbull, Monster)",
      price: 18000,
      image: "https://m.media-amazon.com/images/I/81fXeQXBrrL.jpg"
    },
    {
      id: 3,
      name: "Caja de Vino Tinto Reserva",
      category: "Vinos y Espumantes",
      price: 25000,
      image: "https://tiendacasadonoso.cl/cdn/shop/files/LS_CAR_X12_47bb156f-a3ca-4cd2-9147-c19487b9a21e.png?v=1712163238"
    }
  ]

  return (
    <div className="grid grid-cols-0 md:grid-cols-2 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} imageSize="w-full h-64 object-contain p-4 bg-white" />
      ))}
    </div>
  )
}

export default ProductList 