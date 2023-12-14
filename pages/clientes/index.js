// pages/clientes/index.js
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import ClienteForm from "../../src/components/ClienteForm";
import ClientesTable from "../../src/components/ClientesTable";
import { useAuth } from "../../src/hooks/useAuth";

const ClientesPage = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { auth, isAuthChecking } = useAuth();

  // Función para cargar los clientes
  const fetchClientes = useCallback(async () => {
    try {
      console.log(`Bearer token being sent: ${auth.token}`);
      const response = await fetch("http://localhost:5000/api/clients", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al cargar clientes: " + errorText);
      }
      const data = await response.json();
      setClientes(data);
    } catch (err) {
      console.error("Error al cargar clientes:", err);
      setError(err.message);
    }
  }, [auth.token]);

  useEffect(() => {
    if (isAuthChecking) {
      return;
    }

    if (!auth.isAuthenticated) {
      console.log("Usuario no autenticado, redireccionando a login...");
      router.push("/login");
      return;
    }

    fetchClientes();
  }, [auth, isAuthChecking, router, fetchClientes]);

  const handleEdit = useCallback((cliente) => {
    setClienteSeleccionado(cliente);
  }, []);

  const resetClienteSeleccionado = useCallback(() => {
    setClienteSeleccionado(null);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/clients/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (response.ok) {
          // Eliminar el cliente del estado si la respuesta es exitosa
          setClientes((prevClientes) =>
            prevClientes.filter((cliente) => cliente.id !== id)
          );
        } else {
          // Manejo de errores
          const errorText = await response.text();
          throw new Error(errorText);
        }
      } catch (err) {
        console.error("Error al eliminar cliente:", err);
        setError(err.message);
      }
    },
    [auth.token]
  );

  const handleUpdate = useCallback(
    (updatedCliente, isNew = false) => {
      if (isNew) {
        setClientes([...clientes, updatedCliente]);
      } else {
        setClientes(
          clientes.map((cliente) =>
            cliente.id === updatedCliente.id ? updatedCliente : cliente
          )
        );
      }
      resetClienteSeleccionado();
    },
    [clientes, resetClienteSeleccionado]
  );

  if (isAuthChecking) {
    return <div>Cargando...</div>; // Muestra una pantalla de carga durante la verificación
  }
  return (
    <div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center py-6">
        <div className="text-2xl font-semibold text-gray-900 my-6">Clientes</div>
      </div>
        {error && <p className="text-red-500">{error}</p>}
        <ClienteForm
          cliente={clienteSeleccionado}
          resetClienteSeleccionado={resetClienteSeleccionado}
          handleUpdate={handleUpdate}
        />
        <ClientesTable
          clientes={clientes}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default ClientesPage;
