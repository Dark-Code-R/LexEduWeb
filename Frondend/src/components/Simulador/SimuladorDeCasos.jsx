import React from 'react';
import { Link } from 'react-router-dom';
import "./SimuladorDeCasos.css"; // Asegúrate de tener tus estilos en el archivo SimuladorDeCasos.css

function SimuladorDeCasos() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Simulador De Juicio</div>
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
          <div className="simulador-casos">
            <h2>Simulador de Casos</h2>
            <div className="game-area">
              <p>Aquí se mostrará el juego del simulador de casos.</p>
              {/* Puedes insertar un iframe, un componente de juego o cualquier otro elemento aquí */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimuladorDeCasos;
