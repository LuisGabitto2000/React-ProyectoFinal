import { Link } from "react-router-dom";
import styles from './Navbar.module.css'; 

const Navbar = ({ esAdmin }) => {
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
      </ul>
    </nav>
  );
};

export default Navbar;