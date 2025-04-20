import { Link } from 'react-router-dom'
import { useState } from 'react'
import Profile from './Profile'

const Header = ({ cartCount }) => {
    const [searchTerm, setSearchTerm] = useState('')
  
    return (
      <header className="bg-blue-800 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MYNO</Link>
          
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full p-2 rounded text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 hover:text-blue-200"
            >
              <span>Mi Perfil</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            
            <Link to="/checkout" className="flex items-center space-x-2 hover:text-blue-200">
              <span>Carrito ({cartCount})</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header