import { useState } from 'react'
import ProductList from '../components/ProductList'

const Home = ({ addToCart }) => {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-blue-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">MYNO Market Mayorista</h1>
            <p className="text-xl mb-6">Los mejores precios al por mayor para tu negocio</p>
          </div>
        </div>
  
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <ProductList addToCart={addToCart} />
        </main>
      </div>
    )
  }
  
  export default Home