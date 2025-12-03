
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Moda from "./pages/Moda";
import Tecnologia from "./pages/Tecnologia";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./components/Carrito";
import Admin from "./components/Admin";
import RutaProtegida from "./components/RutaProtegida";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductoContext";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/moda" element={<Moda />} />
          <Route path="/tecnologia" element={<Tecnologia />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={
            <RutaProtegida><Carrito /></RutaProtegida>
          }/>
          <Route path="/admin" element={
            <RutaProtegida><Admin /></RutaProtegida>
          }/>
        </Routes>
        <Footer />
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;