import { useState } from "react";
import { useProductosContext } from "../context/ProductoContext";
import styles from "./FormProducto.module.css";
import X from "../assets/X";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {
  
  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto } = useProductosContext();

  const manejarChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    if (modo === "agregar") {
      await agregarProducto(producto);
    } else {
      await editarProducto(producto);
    }
    onCerrar();
  };

  return (
    <div 
      className={styles.modalOverlay}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modalContainer}>
        
        <div className={styles.modalContent}>   
          
          <div className={styles.modalHeader}>
            <h3 className={styles.modalHeaderTitle}>
              {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
            </h3>
            <button 
              type="button" 
              onClick={onCerrar}
              className={styles.closeButton}
            >
              <X />
            </button>
          </div>
          
          <form onSubmit={manejarSubmit}>
            <div className={styles.formGrid}>
             
              
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  className={styles.formInputBase}
                  placeholder="Nombre del producto"
                  value={producto.nombre || ""}
                  onChange={manejarChange}
                  required
                />
              </div>
              
              
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  className={styles.formInputBase}
                  placeholder="$0.00"
                  value={producto.precio || ""}
                  onChange={manejarChange}
                  required
                  min="0"
                  step="any"
                />
              </div>

              
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  Categoría
                </label>
                <select
                  name="categoria"
                  className={styles.formInputBase}
                  value={producto.categoria || ""}
                  onChange={manejarChange}
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Moda">Moda</option>
                  <option value="Tecnologia">Tecnología</option>
                </select>
              </div>
              
              
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  URL de Imagen
                </label>
                <input
                  type="text"
                  name="imagen"
                  className={styles.formInputBase}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={producto.imagen || ""}
                  onChange={manejarChange}
                />
              </div>
              
              
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Descripción del Producto
                </label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className={styles.formInputBase}
                  placeholder="Descripción del producto"
                  value={producto.descripcion || ""}
                  onChange={manejarChange}
                  required
                ></textarea>
              </div>
            </div>
            
            
            <div className={styles.modalActions}>
              
              <button 
                type="submit" 
                className={`${styles.btnBase} ${styles.btnPrimary}`}
              >
                {modo === "agregar" ? "Agregar" : "Actualizar"}
              </button>
              
              <button 
                type="button" 
                onClick={onCerrar}
                className={`${styles.btnBase} ${styles.btnSecondary}`}
              >
                Cancelar
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default FormProducto;