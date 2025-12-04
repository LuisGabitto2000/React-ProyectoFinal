import { useSearch } from "../context/BusquedaContext";
import { useProductosContext } from "../context/ProductoContext";
import { CarritoContext } from "../context/CarritoContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const ResultadoBusqueda = () => {
  const { busqueda } = useSearch();
  const { productos } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const clave = (busqueda || "").trim().toLowerCase();

  if (!clave) {
    return (
      <div style={{ padding: 20 }}>
        <h2 style={{ color: "#4C0463" }}>Resultados</h2>
        <p>Escribe el nombre para ver el producto.</p>
      </div>
    );
  }

  const filtrados = productos.filter((p) => {
    const nombre = p.nombre?.toLowerCase() || "";
    const desc = p.descripcion?.toLowerCase() || "";
    const cat = p.categoria?.toLowerCase() || "";
    return (
      nombre.includes(clave) ||
      desc.includes(clave) ||
      cat.includes(clave)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#FF6ECE", marginBottom: "20px" }}>
        Resultados para: "{busqueda}"
      </h2>

      {filtrados.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {filtrados.map((producto) => (
            <div
              key={producto.id}
              style={{
                backgroundColor: "#E6B5E8",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {producto.imagen && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "120px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              <h3 style={{ fontSize: "16px", color: "#333" }}>
                {producto.nombre}
              </h3>

              <p style={{ fontWeight: "bold", color: "#FF6ECE" }}>
                ${producto.precio}
              </p>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => agregarAlCarrito(producto)}
                  style={{
                    backgroundColor: "#FF6ECE",
                    border: "none",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Agregar
                </button>

                <Link
                  to={`/productos/${producto.id}`}
                  style={{
                    marginLeft: "10px",
                    color: "#4C0463",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultadoBusqueda;