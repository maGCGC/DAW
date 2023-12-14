const ClientesTable = ({ clientes, handleEdit, handleDelete }) => {
    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">Nombre</th>
                            <th scope="col" className="py-3 px-6">CIF</th>
                            <th scope="col" className="py-3 px-6">Dirección</th>
                            <th scope="col" className="py-3 px-6">Email</th>
                            <th scope="col" className="py-3 px-6">Teléfono</th>
                            <th scope="col" className="py-3 px-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6">{cliente.nombre}</td>
                                <td className="py-4 px-6">{cliente.CIF}</td>
                                <td className="py-4 px-6">{cliente.direccion}</td>
                                <td className="py-4 px-6">{cliente.email}</td>
                                <td className="py-4 px-6">{cliente.telefono}</td>
                                <td className="py-4 px-6 text-right">
                                    <button onClick={() => handleEdit(cliente)} className="text-blue-600 hover:text-blue-900 hover:underline">Editar</button>
                                    <button onClick={() => handleDelete(cliente.id)} className="text-red-600 hover:text-red-900 hover:underline ml-4">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientesTable;
