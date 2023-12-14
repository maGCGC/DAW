// src/components/FormLogin.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';

const FormLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // Estado local para errores
  const { login } = useAuth(); // Utilizar el hook
  const router = useRouter();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null); // Reiniciar los errores antes de un nuevo intento de login
  
    try {
      const response = await login(credentials.email, credentials.password);
  
      if (!response.success) {
        // Si hay un error en la respuesta del hook, actualizar el estado de error
        setError(response.error);
      } else {
        // Redirigir al dashboard si el inicio de sesión es exitoso
        router.push('/dashboard');
      }
    } catch (error) {
      // Capturar cualquier error inesperado y actualizar el estado de error
      setError('Error inesperado durante el inicio de sesión.');
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10">
      
      <div className="min-h-screen justify-center items-center bg-white">
        <div className="max-w-md w-full p-10 bg-gray-100">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-xl font-bold">AutoFactura</h2>
          </div>
          <form onSubmit={handleSubmit} className="mb-4">
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Mostrar errores */}
            <h3 className="font-semibold text-lg mb-2">Introduce tu correo electrónico y contraseña</h3>
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              className="w-full p-2 mb-3 border rounded"
              value={credentials.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              className="w-full p-2 mb-2 border rounded"
              value={credentials.password}
              onChange={handleChange}
            />
            <Link href="/forgot-password">
              <a className="text-blue-600 text-sm mb-6">He olvidado mi contraseña</a>
            </Link>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              Iniciar sesión
            </button>
          </form>
          <div className="flex items-center justify-between mb-6">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
            <p className="text-xs text-center text-gray-500 uppercase">o inicia sesión con</p>
            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <div className="flex justify-center mb-4">
            <button className="border rounded-full border-gray-400 text-gray-700 px-4 py-2 text-sm flex items-center">
              <i className="fab fa-google text-red-500 mr-2"></i> Google
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">¿Todavía no tienes acceso a AutoFactura?</p>
            <Link href="/register">
              <a className="mt-2 px-6 py-1 bg-green-500 text-white rounded hover:bg-green-600">Empieza Gratis</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;