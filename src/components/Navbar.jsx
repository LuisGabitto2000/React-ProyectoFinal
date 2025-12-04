import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = ({ esAdmin, mostrarBusqueda, setMostrarBusqueda }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Inicio</Link>
        </li>
        <li className={styles.item}>
          <Link to="/tecnologia" className={styles.link}>Tecnología</Link>
        </li>
        <li className={styles.item}>
          <Link to="/moda" className={styles.link}>Moda</Link>
        </li>

        {esAdmin && (
          <li className={styles.item}>
            <Link to="/admin" className={styles.link}>Admin</Link>
          </li>
        )}

        <li className={styles.item}>
          <button
            onClick={() => setMostrarBusqueda(prev => !prev)}
            aria-label="Abrir búsqueda"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#FF6ECE"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
