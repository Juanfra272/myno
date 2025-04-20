import { Link } from 'react-router-dom'

const Profile = () => {
  const recentOrders = [
    {
      id: 1,
      product: 'ARROZ DE CAMPO',
      description: 'CULTIVADO CON EL CORAZÓN Peso Neto 50 kg.',
      date: '2023-05-15',
      total: 259.90
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
          <h2 className="text-xl">MYNO Market Mayorista</h2>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-4xl font-bold">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Usuario Mayorista</h2>
              <p className="text-gray-600">Los mejores precios al por mayor para tu negocio</p>
              <p className="text-blue-600 font-medium mt-2">usuario@myno.com</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <section className="border rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Mis Pedidos</h3>
              {recentOrders.map(order => (
                <div key={order.id} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{order.product}</h4>
                    <span className="text-blue-600">${order.total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.description}</p>
                  <p className="text-xs text-gray-500 mt-2">Pedido el {order.date}</p>
                  <Link 
                    to="#" 
                    className="inline-block text-blue-600 text-sm mt-2 hover:underline"
                  >
                    Ver detalles
                  </Link>
                </div>
              ))}
              <Link 
                to="/orders" 
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                Ver historial completo
              </Link>
            </section>

            <section className="border rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Configuración</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Información Personal</h4>
                  <p className="text-sm text-gray-600">Actualiza tus datos de contacto</p>
                </div>
                <div>
                  <h4 className="font-medium">Preferencias</h4>
                  <p className="text-sm text-gray-600">Configura tus preferencias de compra</p>
                </div>
                <div>
                  <h4 className="font-medium">Seguridad</h4>
                  <p className="text-sm text-gray-600">Cambia tu contraseña</p>
                </div>
                <button className="text-red-600 hover:text-red-800 mt-4">
                  Cerrar sesión
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Producto destacado (como en el diseño) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Arroz Premium 50kg</h3>
          <p className="text-gray-600 mb-4">Arroz de grano largo, calidad premium para negocios</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-2">
                <span className="font-medium">Cantidad (sacos):</span> 10
              </div>
              <div className="mb-2">
                <span className="font-medium">Mínimo:</span> 10 sacos
              </div>
              <div className="mb-2">
                <span className="font-medium">Precio:</span> $25.99 / saco
              </div>
              <div className="text-lg font-bold mb-2">
                Total: $259.90
              </div>
              <div className="text-sm">
                <span className="font-medium">Stock:</span> 120 sacos
              </div>
            </div>
            
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition-colors">
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile