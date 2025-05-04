import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const Profile = () => {
  
  
  const { user, logout } = useAuth();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CL', options);
  };

  if (!user) {
    return (
      <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-6">Acceso no autorizado</h1>
        <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tu perfil</p>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
          >
            Iniciar sesión
          </Link>
          <Link 
            to="/register" 
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors inline-block"
          >
            Registrarse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">MI PERFIL</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Información Personal</h2>
        <div className="space-y-3">
          <p><span className="font-semibold text-gray-700">Nombre:</span> {user.name}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {user.email}</p>
          <p><span className="font-semibold text-gray-700">Contacto:</span> {user.phone}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">Historial de Compras</h2>
        {user.purchases.length === 0 ? (
          <p className="text-gray-500">No hay compras registradas</p>
        ) : (
          <div className="space-y-4">
            {user.purchases.map((purchase) => (
              <div key={purchase.id} className="border rounded-lg p-4">
                <div className="flex justify-between border-b pb-2 mb-2">
                  <p className="font-semibold">
                    Pedido #{purchase.id.toString().slice(-6)}
                  </p>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {formatDate(purchase.date)}
                    </p>
                    <p className="text-sm font-medium">
                      {purchase.status === 'completed' ? (
                        <span className="text-green-600">Completado</span>
                      ) : (
                        <span className="text-yellow-600">En proceso</span>
                      )}
                    </p>
                  </div>
                </div>
                
                {purchase.items.map((item, index) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.product}
                        className="w-12 h-12 object-contain"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjYyI+PHBhdGggZD0iTTE5IDVIMWEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMThhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJ6bTAgMTZIMVY3aDE4djE0ek0xMSAxNUw1IDl2MTBoMTRWOWwtNiA2eiIvPjwvc3ZnPg==';
                        }}
                      />
                      <div>
                        <p className="font-medium">{item.product}</p>
                        {item.size && <p className="text-xs text-gray-500">Talla: {item.size}</p>}
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ${item.price.toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${(item.quantity * item.price).toLocaleString('es-CL')}
                    </p>
                  </div>
                ))}
                
                <div className="flex justify-between mt-3 pt-3 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Envío a:</p>
                    <p className="text-sm">
                      {purchase.shippingInfo?.address}, {purchase.shippingInfo?.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total:</p>
                    <p className="font-bold text-green-600">
                      ${purchase.total.toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Contacto | Sobre Nosotros</p>
        <p className="mt-2">© 2025 MYNO STORE - Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Profile;