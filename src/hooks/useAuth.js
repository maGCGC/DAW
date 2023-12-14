// src/hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false, id: null, error: null });
  const [isAuthChecking, setIsAuthChecking] = useState(true); // Estado para verificar la autenticación

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        fetch('http://localhost:5000/api/users/validate-token', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.valid) {
                // Descomponer el token para obtener el ID del usuario
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setAuth({ token, isAuthenticated: true, id: decodedToken.id, error: null });
            } else {
                throw new Error('Token no válido');
            }
        })
        .catch(error => {
            localStorage.removeItem('jwtToken');
            setAuth({ token: null, isAuthenticated: false, id: null, error: error.message });
        })
        .finally(() => setIsAuthChecking(false)); // Marcar como completada la verificación
    } else {
        setIsAuthChecking(false); // No hay token, marcar como completada
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token); // Almacenar el token en localStorage
        // Descomponer el token para obtener el ID del usuario
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        setAuth({ token: data.token, isAuthenticated: true, id: decodedToken.id, error: null });
        return { success: true };
      } else {
        const errorData = await response.json();
        setAuth({ ...auth, error: errorData.message || 'Error en el inicio de sesión' });
        return { success: false, error: errorData.message || 'Error en el inicio de sesión' };
      }
    } catch (error) {
      setAuth({ ...auth, error: 'Error de conexión o del servidor' });
      return { success: false, error: 'Error de conexión o del servidor' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken'); // Eliminar el token del localStorage
    setAuth({ token: null, isAuthenticated: false, id: null, error: null });
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthChecking, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
