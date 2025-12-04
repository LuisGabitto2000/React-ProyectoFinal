import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/BusquedaContext";

const BarraBusqueda = () => {
  const [texto, setTexto] = useState("");
  const { setBusqueda } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBusqueda(texto);
    navigate("/buscar");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px auto",
        width: "100%",
        maxWidth: "450px",
      }}
    >
      <input
        type="text"
        placeholder="Buscar productos..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          border: "2px solid #4C0463",
          borderRadius: "10px 0 0 10px",
          fontSize: "16px",
          backgroundColor: "#fff",
          color: "#4C0463",
          transition: "0.2s",
          outline: "none",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#FF6ECE";
          e.target.style.boxShadow = "0 0 4px #FF6ECE";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#4C0463";
          e.target.style.boxShadow = "none";
        }}
      />

      <button
        type="submit"
        style={{
          padding: "12px 18px",
          border: "none",
          backgroundColor: "#FF6ECE",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
          borderRadius: "0 10px 10px 0",
          cursor: "pointer",
          transition: "0.2s",
          outline: "none",
          boxShadow: "none",
        }}
        
      >
        Buscar
      </button>
    </form>
  );
};

export default BarraBusqueda;