// src/components/HeroSection.js
const HeroSection = () => {
    return (
      <div className="text-center p-16 bg-gray-100">
        <h1 className="text-5xl font-bold mb-4">La forma más fácil de llevar la facturación de tu negocio</h1>
        <p className="mb-8">Más de 75.000 pymes y autónomos usan FacturaDirecta para hacer su trabajo más fácil, agradable y productivo.</p>
        <div>
          <button className="mx-2 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Empieza Gratis</button>
          <button className="mx-2 px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100">Entra con Google</button>
        </div>
      </div>
    );
  };
  
  export default HeroSection;
  