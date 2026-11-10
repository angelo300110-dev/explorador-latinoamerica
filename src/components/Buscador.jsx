
function Buscador({ busqueda, setBusqueda }) {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Buscar país..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
}

export default Buscador;
