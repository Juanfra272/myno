import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import usersData from '../data/user.json';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario al inicio
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        setError('Error al cargar la sesión');
        console.error('Error loading user:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUser();
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const foundUser = usersData.users.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Credenciales incorrectas');
      }

      const userWithCart = { 
        ...foundUser, 
        cart: [],
        token: `mock-token-${Date.now()}`
      };
      
      setUser(userWithCart);
      localStorage.setItem('user', JSON.stringify(userWithCart));
      return userWithCart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    return Promise.resolve();
  }, []);

  const addPurchase = useCallback(async (newPurchase) => {
    if (!user) throw new Error('Usuario no autenticado');
    
    try {
      const updatedUser = {
        ...user,
        purchases: [
          ...(user.purchases || []),
          {
            ...newPurchase,
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'completed'
          }
        ]
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      console.error('Error adding purchase:', err);
      throw err;
    }
  }, [user]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        error,
        login, 
        logout, 
        addPurchase,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};