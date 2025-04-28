import ProductList from '../components/ProductList'
import Header from '../components/Header'

const Home = () => {
  return (

    
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">MYNO STORE</h1>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <ProductList />
        </div>
      </div>
    </div>
  )
}

export default Home