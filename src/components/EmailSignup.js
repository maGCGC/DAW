// src/components/EmailSignup.js
import { useState } from 'react';
import { useRouter } from 'next/router';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirige al usuario a la página de registro con el email como query param
    router.push(`/register?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Tu email"
      />
      <button type="submit">Empieza Gratis</button>
    </form>
  );
};

export default EmailSignup;
