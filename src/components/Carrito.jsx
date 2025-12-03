import { useContext, useMemo } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarDelCarrito, aumentarCantidad, reducirCantidad } =
    useContext(CarritoContext);

  
  const total = useMemo(() => {
    return carrito.reduce((acc, producto) => {
      const precio = producto.price || producto.precio;
      return acc + precio * producto.cantidad;
    }, 0);
  }, [carrito]);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        alignItems: "flex-start",
      }}
    >
      
      <div style={{ flex: 2 }}>
        <h2 style={{ color: "#FF6ECE" }}>Carrito</h2>

        {carrito.length === 0 && <p>No hay productos en el carrito</p>}

        {carrito.map((producto) => (
          <div
            key={producto.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "10px",
              backgroundColor: "#F7D6F7",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={producto.image || producto.imagen}
              alt={producto.title || producto.nombre}
              height={80}
              width={80}
              style={{ objectFit: "contain" }}
            />

            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {producto.title || producto.nombre}
              </p>
              <p style={{ margin: 0 }}>
                ${producto.price || producto.precio}
              </p>
            </div>

            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <button
                onClick={() => reducirCantidad(producto.id)}
                style={{
                  backgroundColor: "#FF6ECE",
                  border: "none",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                -
              </button>

              <span
                style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}
              >
                {producto.cantidad}
              </span>

              <button
                onClick={() => aumentarCantidad(producto.id)}
                style={{
                  backgroundColor: "#FF6ECE",
                  border: "none",
                  color: "white",
                  width: "28px",
                  height: "28px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            
            <button
              onClick={() => eliminarDelCarrito(producto.id)}
              style={{
                marginLeft: "auto",
                backgroundColor: "#FF6ECE",
                border: "none",
                borderRadius: "5px",
                color: "white",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      
      <div
        style={{
          flex: 1,
          backgroundColor: "#E6B5E8",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          position: "sticky",
          top: "20px",
        }}
      >
        <h3 style={{ color: "#FF6ECE", marginBottom: "10px" }}>
          Resumen de compra
        </h3>

        <p
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Total: ${total.toFixed(2)}
        </p>

        <p
          style={{
            color: "#FF6ECE",
            fontWeight: "bold",
            backgroundColor: "#FDE6FA",
            padding: "8px",
            borderRadius: "8px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
        Envío Gratis
        </p>

        <button
          style={{
            marginTop: "20px",
            width: "100%",
            backgroundColor: "#FF6ECE",
            border: "none",
            padding: "12px",
            color: "white",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Carrito;