import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductosContext } from "../context/ProductosContext";

const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useProductosContext();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const productoLocal = productos.find((p) => p.id.toString() === id.toString());

    if (productoLocal) {
      setProducto(productoLocal);
    } else {
      
      fetch(`https://692f6c7a91e00bafccd78e74.mockapi.io/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Producto no encontrado");
          return res.json();
        })
        .then((data) =>
          setProducto({
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            image: data.image,
          })
        )
        .catch(() => setError("El producto no se pudo obtener"));
    }
  }, [id, productos]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="min-h-screen bg-[#1F1D2B] text-gray-200 flex flex-col items-center justify-center p-6">
      <div className="bg-[#262837] rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <img
          src={producto.image}
          alt={producto.title}
          className="w-60 h-60 object-contain mx-auto mb-6"
        />
        <h2 className="text-2xl font-semibold mb-4">{producto.title}</h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{producto.description}</p>
        <p className="text-[#ec7c6a] font-bold text-xl mb-8">${producto.price}</p>
        <Link
          to="/"
          className="inline-block bg-[#ec7c6a] hover:bg-[#d86b5a] text-white font-semibold py-2 px-6 rounded-xl transition-colors duration-200"
        >
          ← Volver
        </Link>
      </div>
    </div>
  );
};

export default DetalleProducto;