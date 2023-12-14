import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const VentasForm = ({ venta, resetVentaSeleccionada, handleUpdate, clientes }) => {
    const [formData, setFormData] = useState({
      numero_factura: '',
      fecha: '',
      total: 0,
      cliente_id: '',
      concepto: '',
    });
  
    const { auth } = useAuth(); 

    useEffect(() => {
        if (venta) {
          setFormData({
            numero_factura: venta.numero_factura || '',
            fecha: venta.fecha || '',
            total: venta.total || 0,
            cliente_id: venta.cliente_id || '',
            concepto: venta.concepto || '',  // Agrega esto
          });
        }
      }, [venta]);
      

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = venta ? 'PUT' : 'POST';
    const endpoint = venta
      ? `http://localhost:5000/api/ventas/${venta.id}`
      : 'http://localhost:5000/api/ventas';
  
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ ...formData, usuario_id: auth.id }),
      });
  
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(errorText.message || 'Error en el servidor');
      }
  
      const updatedVenta = await response.json();
      handleUpdate(updatedVenta, !venta);
      resetForm();
    } catch (err) {
      console.error('Error al enviar datos:', err);
      alert('Error al procesar la venta: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      numero_factura: '',
      fecha: '',
      total: 0,
      cliente_id: '',
      concepto: '', 
    });
    resetVentaSeleccionada();
  };

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="numero_factura" className="block text-sm font-medium text-gray-700">Número de Factura:</label>
          <input
            type="text"
            id="numero_factura"
            name="numero_factura"
            value={formData.numero_factura}
            onChange={handleChange}
            placeholder="Número de Factura de Venta"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha:</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
  <label htmlFor="concepto" className="block text-sm font-medium text-gray-700">Concepto:</label>
  <input
    type="text"
    id="concepto"
    name="concepto"
    value={formData.concepto}
    onChange={handleChange}
    placeholder="Concepto de la venta"
    maxLength="255"  // Limita la entrada a 255 caracteres
    required
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
  />
</div>

        <div>
          <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total:</label>
          <input
            type="number"
            id="total"
            name="total"
            value={formData.total}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="cliente_id" className="block text-sm font-medium text-gray-700">Cliente:</label>
          <select
            id="cliente_id"
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Seleccione un Cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {venta ? 'Actualizar' : 'Crear'} Venta
        </button>
      </form>
    </div>
  );
};

export default VentasForm;
