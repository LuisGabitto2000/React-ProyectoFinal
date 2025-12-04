import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./Header.module.css";
import UserIcon from "../assets/UserIcon";
import BagIcon from "../assets/BagIcon";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import BarraBusqueda from "./BarraBusqueda";

const Header = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

  const estaLogeado = !!usuario;
  const esAdmin = usuario?.rol === "admin";

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>Outsider's Shop</div>

        
        <div className={styles.navbarContainer}>
          <Navbar 
            esAdmin={esAdmin} 
            mostrarBusqueda={mostrarBusqueda} 
            setMostrarBusqueda={setMostrarBusqueda} 
          />
        </div>

        
        <div className={styles.iconsContainer}>
          <div className={styles.icono}>
            {estaLogeado ? (
              <div className={styles.usuarioBox}>
                <span className={styles.bienvenida}>
                  ¡Hola, {usuario?.nombre ?? "Usuario"}!
                </span>
                <button onClick={logout} className={styles.logoutBtn}>
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.loginLink}>
                <UserIcon />
              </Link>
            )}
          </div>

          <div className={styles.iconoDeCarrito}>
            <Link
              to="/carrito"
              style={{ position: "relative", display: "inline-block" }}
            >
              <BagIcon className={styles.icono} />
              {cantidadTotal > 0 && (
                <span className={styles.contadorDeCarrito}>{cantidadTotal}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      
      {mostrarBusqueda && (
        <div className={styles.searchBarWrapper}>
          <BarraBusqueda />
        </div>
      )}
    </>
  );
};

export default Header;