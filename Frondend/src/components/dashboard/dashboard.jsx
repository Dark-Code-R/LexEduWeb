import React from 'react';
import { Link } from 'react-router-dom';
import Chat from '../consultor/Chat';
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Asistente Virtual Legal</div>
          <ul className="nav-links-horizontal">
            <li><Link to="/contratos">Generador de Casos</Link></li>
            <li><Link to="/simulador-de-casos">Simulador De Casos Reales</Link></li>
            <li><Link to="/foro-social">Foro Social</Link></li>
            <li><Link to="/notificaciones">Notificaciones</Link></li>
            <li><Link to="/perfil-configuracion">Perfil y Configuración</Link></li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="consultor-legal">
            <h2>Consultor Legal</h2>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
