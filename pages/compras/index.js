// pages/compras/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import ComprasForm from '../../src/components/ComprasForm'; // Asegúrate de que el path sea correcto
import ComprasTable from '../../src/components/ComprasTable'; // Asegúrate de que el path sea correcto
import { useAuth } from '../../src/hooks/useAuth';

const ComprasPage = () => {
  const [compras, setCompras] = useState([]);
  const [clientes, setClientes] = useState([]); // Utilizamos clientes si las compras están asociadas a clientes
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const { auth,isAuthChecking } = useAuth();
  const router = useRouter();

  const fetchClientes = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/clients', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener clientes');
      }
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      // Aquí puedes establecer algún estado para mostrar un mensaje de error si es necesario
    }
  }, [auth.token]);

  const fetchCompras = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/compras', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener compras');
      }
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error('Error al cargar compras:', error);
      // Aquí puedes establecer algún estado para mostrar un mensaje de error si es necesario
    }
  }, [auth.token]);

  useEffect(() => {
    if (isAuthChecking) {
      return;
    }
    if (!auth.isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchClientes();
    fetchCompras();
  }, [auth, isAuthChecking, router, fetchClientes, fetchCompras]);

  const handleEditCompra = (compraId) => {
    const compra = compras.find((v) => v.id === compraId);
    setCompraSeleccionada(compra);
  };

  const handleDeleteCompra = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/compras/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar la compra: ${errorText}`);
      }
  
      // Actualizar la lista de ventas eliminando la venta borrada
      setCompras(compras.filter((compra) => compra.id !== id));
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
      // Aquí puedes establecer algún estado para mostrar un mensaje de error si es necesario
    }
  }, [auth.token, compras]);

  const handleUpdate = (updatedCompra, isNew = false) => {
    if (isNew) {
      setCompras([...compras, updatedCompra]);
    } else {
      setCompras(
        compras.map((compra) => (compra.id === updatedCompra.id ? updatedCompra : compra))
      );
    }
    resetCompraSeleccionada();
  };

  const resetCompraSeleccionada = () => {
    setCompraSeleccionada(null);
  };

  return (
    <div>
    <div className="flex justify-center items-center py-6">
        <div className="text-2xl font-semibold text-gray-900 my-6">Compras</div>
      </div>
      <ComprasForm 
        compra={compraSeleccionada} 
        resetCompraSeleccionada={resetCompraSeleccionada} 
        handleUpdate={handleUpdate}
        clientes={clientes}
      />
      <ComprasTable
        compras={compras}
        handleEditCompra={handleEditCompra}
        handleDeleteCompra={handleDeleteCompra}
      />
    </div>
  );
};

export default ComprasPage;