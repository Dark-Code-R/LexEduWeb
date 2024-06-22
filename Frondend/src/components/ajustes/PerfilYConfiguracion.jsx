import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./PerfilYConfiguracion.css"; // Asegúrate de tener tus estilos en el archivo PerfilYConfiguracion.css

function PerfilYConfiguracion() {
  const [profile, setProfile] = useState({
    nombre: 'Nombre del Usuario',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de usuario actualizados:', profile.nombre);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (profile.newPassword !== profile.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Contraseña actualizada:', profile.newPassword);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Asistente Virtual Legal</div>
          <ul className="nav-links-horizontal">
            <li><Link to="/dashboard">Consultor Legal</Link></li>
            <li><Link to="/contratos">Generador de Casos</Link></li>
            <li><Link to="/foro-social">Foro Social</Link></li>
            <li><Link to="/notificaciones">Notificaciones</Link></li>
            <li><Link to="/perfil-configuracion">Perfil y Configuración</Link></li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="perfil-configuracion">
            <h2>Perfil y Configuración</h2>
            
            <form onSubmit={handleUserSubmit}>
              <h3>Editar Datos de Usuario</h3>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={profile.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button type="submit">Guardar Cambios</button>
              </div>
            </form>

            <form onSubmit={handlePasswordSubmit}>
              <h3>Editar Contraseña</h3>
              <div className="form-group">
                <label htmlFor="password">Contraseña Actual</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nueva Contraseña</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button type="submit">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilYConfiguracion;
