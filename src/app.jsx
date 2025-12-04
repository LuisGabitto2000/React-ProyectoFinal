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
import ResultadoBusqueda from "./pages/ResultadosBusqueda"; 

import { AuthProvider } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductoContext";
import { CarritoProvider } from "./context/CarritoContext";
import { SearchProvider } from "./context/BusquedaContext";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>
        <CarritoProvider>
          <SearchProvider>
            
            <Header />

            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/moda" element={<Moda />} />
              <Route path="/tecnologia" element={<Tecnologia />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productos/:id" element={<ProductoDetalle />} />

              
              <Route path="/buscar" element={<ResultadoBusqueda />} />

              <Route 
                path="/carrito" 
                element={
                  <RutaProtegida>
                    <Carrito />
                  </RutaProtegida>
                }
              />

              <Route 
                path="/admin" 
                element={
                  <RutaProtegida>
                    <Admin />
                  </RutaProtegida>
                }
              />
            </Routes>

            <Footer />

          </SearchProvider>
        </CarritoProvider>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;