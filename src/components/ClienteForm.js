// src/components/ClienteForm.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

const ClienteForm = ({ cliente, resetClienteSeleccionado, handleUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    email: "",
    telefono: "",
    CIF: "",
  });

  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Auth State in ClienteForm:", auth);
    if (cliente) {
      setFormData({
        nombre: cliente.nombre || "",
        direccion: cliente.direccion || "",
        email: cliente.email || "",
        telefono: cliente.telefono || "",
      });
    }
  }, [cliente, auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = cliente ? "PUT" : "POST";
    const endpoint = cliente
      ? `http://localhost:5000/api/clients/${cliente.id}`
      : "http://localhost:5000/api/clients";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ ...formData, usuario_id: auth.id }), // Asegúrate de enviar el id del usuario
      });

      if (!response.ok) {
        // Manejo de errores
        let errorText;
        try {
          const errorData = await response.json();
          errorText = errorData.message || JSON.stringify(errorData);
        } catch (jsonError) {
          errorText = await response.text();
        }
        throw new Error(`Error al procesar la solicitud: ${errorText}`);
      }

      const updatedCliente = await response.json();
      const isNewCliente = !cliente; // Si no hay 'cliente', entonces es un nuevo cliente
      handleUpdate(updatedCliente, isNewCliente); // Pasa un segundo argumento para indicar si es nuevo
      resetForm(); // Limpia el formulario
    } catch (err) {
      console.error("Error al procesar la solicitud:", err);
      alert(err.message);
    }
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      nombre: "",
      direccion: "",
      email: "",
      telefono: "",
      CIF: "",
    });
    resetClienteSeleccionado(); // Si se está editando un cliente
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="CIF"
            className="block text-sm font-medium text-gray-700"
          >
            CIF:
          </label>
          <input
            type="text"
            id="CIF"
            name="CIF"
            value={formData.CIF}
            onChange={handleChange}
            placeholder="CIF del cliente"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="direccion"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {cliente ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default ClienteForm;
