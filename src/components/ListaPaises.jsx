
function ListaPaises({ paises }) {
  return (
    <div className="row">
      {paises.map((pais) => (
        <div className="col-md-4 mb-3" key={pais.name.common}>
          <div className="card h-100">
            <div className="card-body text-center">
              <img
                src={pais.flags.png}
                alt={`Bandera de ${pais.name.common}`}
                className="mb-3"
                style={{
                  width: '90px',
                  height: '60px',
                  objectFit: 'contain'
                }}
              />

              <h5>{pais.name.common}</h5>
              <p>Capital: {pais.capital?.[0] || 'Sin capital'}</p>
              <p>Continente: {pais.region}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListaPaises;

