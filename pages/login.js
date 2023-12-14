// pages/login.js
import Head from 'next/head';
import FormLogin from '../src/components/FormLogin';

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>Iniciar Sesión - FacturaDirecta</title>
        <meta name="description" content="Inicia sesión en FacturaDirecta" />
      </Head>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
