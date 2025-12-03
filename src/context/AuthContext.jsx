import { useState, useContext, createContext } from 'react';

const USUARIOS_FAKE = [
  { 
    id: 1, 
    usuario: 'admin', 
    contraseña: '1234', 
    rol: 'admin',
    nombre: 'Admin'
  },
  { 
    id: 2, 
    usuario: 'usuario', 
    contraseña: '1234', 
    rol: 'usuario',
    nombre: 'Usuario'
  }
];


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  
   const login = (nombreUsuario, contraseña) => {
    
    const usuarioLogin = USUARIOS_FAKE.find(
      u => u.usuario === nombreUsuario && u.contraseña === contraseña
    );

    if (usuarioLogin) {
      const token = `fake-token-${nombreUsuario}`;
      localStorage.setItem('authToken', token);
      setUsuario(usuarioLogin);
      return true;
    }
    return false;
  }  
                                       
  const logout = () => {
    localStorage.removeItem('authToken');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{usuario, login, logout}}>
      {children}
    </AuthContext.Provider>
  ); 
}

export const useAuthContext = () => useContext(AuthContext);