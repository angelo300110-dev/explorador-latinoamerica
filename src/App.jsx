
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Buscador from './components/Buscador';
import ListaPaises from './components/ListaPaises';
import Footer from './components/Footer';

function App() {
  const [paises, setPaises] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://restcountries.conventus.de/v3.1/all?fields=name,capital,region,flags')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al consultar la API');
        }
        return respuesta.json();
      })
      .then((datos) => {
        // Países de Latinoamérica
        const latinoamerica = [
          'Argentina', 'Bolivia', 'Brazil', 'Chile',
          'Colombia', 'Costa Rica', 'Cuba',
          'Dominican Republic', 'Ecuador',
          'El Salvador', 'Guatemala', 'Haiti',
          'Honduras', 'Mexico', 'Nicaragua',
          'Panama', 'Paraguay', 'Peru',
          'Uruguay', 'Venezuela'
        ];

        // Filtrar solo los países latinoamericanos
        const paisesLatinos = datos.filter((pais) =>
          latinoamerica.includes(pais.name.common)
        );

        // Ordenar alfabéticamente
        paisesLatinos.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        // Guardar los países
        setPaises(paisesLatinos);
      })
      .catch(() => {
        setError('No se pudieron cargar los países');
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  // Buscador dinámico
  const paisesFiltrados = paises.filter((pais) =>
    pais.name.common.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Header />

      <Buscador
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      {cargando && (
        <p className="text-center">Cargando países...</p>
      )}

      {error && (
        <p className="text-center text-danger">{error}</p>
      )}

      {!cargando && !error && (
        <ListaPaises paises={paisesFiltrados} />
      )}

      {!cargando && !error && paisesFiltrados.length === 0 && (
        <p className="text-center">
          No se encontraron países.
        </p>
      )}

      <Footer />
    </div>
  );
}

export default App;
