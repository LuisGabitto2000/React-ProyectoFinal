import { createContext, useContext, useState, useEffect } from "react";

const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productosAPI, setProductosAPI] = useState([]);
  const [productosCRUD, setProductosCRUD] = useState([]);

  
  const [edicionesAPI, setEdicionesAPI] = useState([]);

  const API_URL = "https://692f6c7a91e00bafccd78e74.mockapi.io/products";

  
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const normalizados = data.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          imagen: p.imagen,
          categoria: p.categoria,
          origen: "api",
        }));

        
        const fusionados = normalizados.map((p) => {
          const editado = edicionesAPI.find((e) => e.id === p.id);
          return editado ? { ...p, ...editado } : p;
        });

        setProductosAPI(fusionados);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };

    fetchProductos();
  }, [edicionesAPI]); 

  
  const agregarProducto = (producto) => {
    const nuevo = {
      id: Date.now(),
      ...producto,
      origen: "crud",
    };
    setProductosCRUD([...productosCRUD, nuevo]);
  };

  
  const editarProducto = (productoEditado) => {
    if (productoEditado.origen === "crud") {
      setProductosCRUD(
        productosCRUD.map((p) =>
          p.id === productoEditado.id ? productoEditado : p
        )
      );
    } else {
      
      const nuevos = [
        ...edicionesAPI.filter((e) => e.id !== productoEditado.id),
        productoEditado,
      ];
      setEdicionesAPI(nuevos);
    }
  };

  const eliminarProducto = (id) => {
    setProductosCRUD(productosCRUD.filter((p) => p.id !== id));
  };

  const productos = [...productosCRUD, ...productosAPI];

  return (
    <ProductosContext.Provider
      value={{ productos, agregarProducto, editarProducto, eliminarProducto }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductosContext = () => useContext(ProductosContext);