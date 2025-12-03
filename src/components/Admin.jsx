import { useState, useEffect } from "react";
import { useProductosContext } from "../context/ProductoContext";
import FormProducto from "./FormProducto";

const Admin = () => {
  const { productos: productosCrud, eliminarProducto } = useProductosContext();
  const [productosApi, setProductosApi] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modo, setModo] = useState("agregar");

  const URL = "https://692f6c7a91e00bafccd78e74.mockapi.io/products";

  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setProductosApi(data);
      } catch (err) {
        console.log("Error al cargar MockAPI:", err);
      }
    };
    fetchApi();
  }, []);

  
  const productosCombinados = [
    ...productosApi, 
    ...productosCrud.filter(
      (pCrud) => !productosApi.some((pApi) => pApi.id === pCrud.id)
    ),
  ];

  const abrirModalAgregar = () => {
    setProductoSeleccionado({});
    setModo("agregar");
    setModalVisible(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModo("editar");
    setModalVisible(true);
  };

  const cerrarModal = () => setModalVisible(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#FF6ECE" }}>Panel de Administrador</h1>

      <button
        onClick={abrirModalAgregar}
        style={{
          backgroundColor: "#FF6ECE",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          marginBottom: "20px",
        }}
      >
        Agregar Producto
      </button>

      <div style={{ display: "grid", gap: "20px" }}>
        {productosCombinados.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "10px",
              backgroundColor: "#E6B5E8",
            }}
          >
            <p><strong>{p.title || p.nombre}</strong></p>
            <p>${p.price || p.precio}</p>
            <p>{p.description || p.descripcion}</p>

            {(p.image || p.imagen) && (
              <img
                src={p.image || p.imagen}
                alt={p.title || p.nombre}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => abrirModalEditar(p)}
                style={{
                  backgroundColor: "#4C0463",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "5px",
                }}
              >
                Editar
              </button>

              
              {productosCrud.find((c) => c.id === p.id) && (
                <button
                  onClick={() => eliminarProducto(p.id)}
                  style={{
                    backgroundColor: "#D44EC4",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "5px",
                  }}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalVisible && (
        <FormProducto
          productoInicial={productoSeleccionado}
          modo={modo}
          onCerrar={cerrarModal}
        />
      )}
    </div>
  );
};

export default Admin;