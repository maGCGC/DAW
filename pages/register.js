// pages/register.js
import Head from 'next/head';
import FormRegistro from '../src/components/FormRegistro';

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>Registro - AutoFactura</title>
        <meta name="description" content="Registro en AutoFactura" />
      </Head>
      <FormRegistro />
    </div>
  );
};

export default RegisterPage;
