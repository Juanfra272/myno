const Profile = () => {
  const purchaseHistory = [
    { product: "Caja de Monsters", date: "15/05/2024", price: 12990 },
    { product: "Pack de Vino Tinto", date: "02/04/2024", price: 24990 },
    { product: "Redbull Individual", date: "20/03/2024", price: 2490 }
  ]

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">MI PERFIL</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Información Personal</h2>
        <div className="space-y-3">
          <p><span className="font-semibold text-gray-700">Nombre:</span> Juan Pérez</p>
          <p><span className="font-semibold text-gray-700">Email:</span> juan.perez@example.com</p>
          <p><span className="font-semibold text-gray-700">Contacto:</span> +56 9 1234 5678</p>
        </div>
      </div>
      

      <div>
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Historial de Compras</h2>
        <div className="space-y-4">
          {purchaseHistory.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-800">{item.product}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <p className="font-bold text-green-600">${item.price.toLocaleString('es-CL')}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Contacto | Sobre Nosotros</p>
        <p className="mt-2">© 2025 MYNO STORE - Todos los derechos reservados</p>
      </div>
    </div>
  )
}

export default Profile