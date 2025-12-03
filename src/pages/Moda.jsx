import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { useProductosContext } from "../context/ProductoContext";

const Moda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productos: productosCRUD } = useProductosContext();

  const URL = 'https://692f6c7a91e00bafccd78e74.mockapi.io/products';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) throw new Error('Error al obtener los productos');

        const datos = await respuesta.json();

        if (!Array.isArray(datos)) {
          setError('Los datos recibidos no son válidos');
          return;
        }

        const modaAPI = datos.filter((p) => p.categoria === 'Moda');
        const modaCRUD = productosCRUD.filter((p) => p.categoria === 'Moda');

        const idsCRUD = new Set(modaCRUD.map(p => p.id));
        const apiSinDuplicar = modaAPI.filter(p => !idsCRUD.has(p.id));

        setProductos([...modaCRUD, ...apiSinDuplicar]);
      } catch (err) {
        console.error(err);
        setError('Error al cargar productos');
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [productosCRUD]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#FF6ECE', marginBottom: '20px' }}>Moda</h2>

      {cargando && <p>Cargando productos de moda...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!cargando && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div
                key={producto.id}
                style={{
                  backgroundColor: '#E6B5E8',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = 'scale(1.03)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = 'scale(1)')
                }
              >
                {producto.imagen && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '120px',
                      width: '100%',
                      marginBottom: '10px',
                    }}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}

                <h3 style={{ fontSize: '16px', color: '#333' }}>
                  {producto.nombre}
                </h3>

                <p style={{ fontWeight: 'bold', color: '#FF6ECE' }}>
                  ${producto.precio}
                </p>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    style={{
                      backgroundColor: '#FF6ECE',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 12px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Agregar
                  </button>

                  <Link
                    to={`/productos/${producto.id}`}
                    style={{
                      color: '#FF6ECE',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos de moda disponibles</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Moda;