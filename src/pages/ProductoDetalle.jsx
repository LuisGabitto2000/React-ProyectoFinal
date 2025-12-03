import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductoContext";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductosContext(); 
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productoLocal = productos.find(
      (p) => p.id.toString() === id.toString()
    );

    if (productoLocal) {
      setProducto({
        id: productoLocal.id,
        title: productoLocal.nombre,
        description: productoLocal.descripcion,
        price: productoLocal.precio,
        image: productoLocal.imagen,
      });
    } else {
      setError("Producto no encontrado");
    }
  }, [id, productos]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="min-h-screen bg-[#4C0463] text-gray-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border-4 border-[#FF6ECE]">
        <img
          src={producto.image}
          alt={producto.title}
          className="w-60 h-60 object-contain mx-auto mb-6"
        />

        <h2 className="text-2xl font-semibold mb-4 text-[#FF6ECE]">{producto.title}</h2>

        <p className="text-white/80 text-sm mb-6 leading-relaxed">
          {producto.description}
        </p>

        <p className="text-[#FF6ECE] font-bold text-xl mb-8">
          ${producto.price}
        </p>

        <Link
          to="/"
          className="inline-block bg-[#FF6ECE] hover:bg-[#ff47c9] text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200"
        >
          ← Volver
        </Link>
      </div>
    </div>
  );
};

export default DetalleProducto;