// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '../src/layout/layout';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default App;
