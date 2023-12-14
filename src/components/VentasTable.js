import React from 'react';

const VentasTable = ({ ventas, handleEditVenta, handleDeleteVenta }) => {
    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">Número de Factura</th>
                            <th scope="col" className="py-3 px-6">Concepto</th>
                            <th scope="col" className="py-3 px-6">Fecha</th>
                            <th scope="col" className="py-3 px-6">Total</th>
                            <th scope="col" className="py-3 px-6">Cliente</th>
                            <th scope="col" className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6">{venta.numero_factura}</td>
                                <td className="py-4 px-6">{venta.concepto}</td>
                                <td className="py-4 px-6">{venta.fecha}</td>
                                <td className="py-4 px-6">{venta.total}</td>
                                <td className="py-4 px-6">{venta.cliente_id}</td>
                                <td className="py-4 px-6 ">
                                    <button onClick={() => handleEditVenta(venta.id)} className="text-blue-600 hover:text-blue-900 hover:underline mr-3">Editar</button>
                                    <button onClick={() => handleDeleteVenta(venta.id)} className="text-red-600 hover:text-red-900 hover:underline">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VentasTable;
