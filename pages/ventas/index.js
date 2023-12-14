// pages/ventas/index.js
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import VentasForm from '../../src/components/VentasForm'; // Asegúrate de que el path sea correcto
import VentasTable from '../../src/components/VentasTable'; // Asegúrate de que el path sea correcto
import { useAuth } from '../../src/hooks/useAuth';

const VentasPage = () => {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const { auth, isAuthChecking } = useAuth();
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

  const fetchVentas = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ventas', {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Error al obtener ventas');
      }
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
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
    fetchVentas();
  }, [auth, isAuthChecking, router, fetchClientes, fetchVentas]);

  const handleEditVenta = (ventaId) => {
    const venta = ventas.find((v) => v.id === ventaId);
    setVentaSeleccionada(venta);
  };

  const handleDeleteVenta = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ventas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar la venta: ${errorText}`);
      }
  
      // Actualizar la lista de ventas eliminando la venta borrada
      setVentas(ventas.filter((venta) => venta.id !== id));
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      // Aquí puedes establecer algún estado para mostrar un mensaje de error si es necesario
    }
  }, [auth.token, ventas]);

  const handleUpdate = (updatedVenta, isNew = false) => {
    if (isNew) {
      setVentas([...ventas, updatedVenta]);
    } else {
      setVentas(
        ventas.map((venta) => (venta.id === updatedVenta.id ? updatedVenta : venta))
      );
    }
    resetVentaSeleccionada();
  };

  const resetVentaSeleccionada = () => {
    setVentaSeleccionada(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center py-6">
        <div className="text-2xl font-semibold text-gray-900 my-6">Ventas</div>
      </div>
      
      <VentasForm 
        venta={ventaSeleccionada} 
        resetVentaSeleccionada={resetVentaSeleccionada} 
        handleUpdate={handleUpdate}
        clientes={clientes}
      />
      <VentasTable
        ventas={ventas}
        handleEditVenta={handleEditVenta}
        handleDeleteVenta={handleDeleteVenta}
      />
    </div>
  );
};

export default VentasPage;
