// src/components/FormRegistro.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const FormRegistro = () => {
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const requestBody = {
      nombre_usuario: formData.nombre_usuario,
      email: formData.email,
      password: formData.password,
    };

    console.log('Sending request:', requestBody);

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        router.push('/login');
      } else {
        const data = await response.json();
        console.log('Registro fallido:', data);
        setError(data.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error de conexión o del servidor');
    }
  };
  


  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center text-2xl font-bold mb-6">Registro</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_usuario">
            Nombre de Usuario
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre_usuario"
            type="text"
            placeholder="Nombre de Usuario"
            name="nombre_usuario"
            value={formData.nombre_usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> {/* Cambiado de contraseña a password */}
          Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" // Cambiado de contraseña a password
          type="password"
          placeholder="Contraseña"
          name="password" // Cambiado de contraseña a password
          value={formData.password} // Cambiado de contraseña a password
          onChange={handleChange}
          required
        />
      </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegistro;
