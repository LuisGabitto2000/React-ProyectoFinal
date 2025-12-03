import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Header.module.css';
import UserIcon from '../assets/UserIcon';
import BagIcon from '../assets/BagIcon';
import { CarritoContext } from '../context/CarritoContext';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const { usuario, logout } = useAuthContext();

  const estaLogeado = !!usuario;
  const esAdmin = usuario?.rol === "admin";

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>Outsider's Shop</div>

      {/* Navbar centrada */}
      <div className={styles.navbarContainer}>
        <Navbar esAdmin={esAdmin} />
      </div>

      {/* Íconos de usuario y carrito */}
      <div className={styles.iconsContainer}>
        <div className={styles.icono}>
          {estaLogeado ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
              <span style={{ fontWeight: "bold" }}>¡Bienvenido, {usuario.nombre}!</span>
              <button
                onClick={logout}
                style={{
                  backgroundColor: "#D44EC4",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "0.9rem"
                }}
              >
                🔓 Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login">
              <UserIcon />
            </Link>
          )}
        </div>

        <div className={styles.iconoDeCarrito}>
          <Link to="/carrito">
            <BagIcon className={styles.icono} />
            {cantidadTotal > 0 && (
              <span className={styles.contadorDeCarrito}>{cantidadTotal}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;