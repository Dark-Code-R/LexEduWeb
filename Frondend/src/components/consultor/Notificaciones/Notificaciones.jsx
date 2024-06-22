import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Notificaciones.css"; // Asegúrate de tener tus estilos en el archivo Notificaciones.css

function Notificaciones() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nueva actualización en el foro: 'Proceso de divorcio en Bolivia'", read: false },
    { id: 2, message: "Se ha generado un nuevo caso en el Simulador de Casos Reales.", read: false },
    { id: 3, message: "Tu consulta sobre 'Pensión alimenticia' ha sido respondida.", read: false }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Notificaciones</div>
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
          <div className="notificaciones">
            <h2>Notificaciones</h2>
            <ul className="notifications-list">
              {notifications.map(notification => (
                <li key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                  <p>{notification.message}</p>
                  {!notification.read && (
                    <button onClick={() => markAsRead(notification.id)}>Marcar como leída</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;
