// /pages/clientes/editar/[id].js
import ClienteForm from '../../../src/components/ClienteForm';
import { useRouter } from 'next/router';

const EditarCliente = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Editar Cliente</h1>
      <ClienteForm clienteId={id} />
    </div>
  );
};

export default EditarCliente;