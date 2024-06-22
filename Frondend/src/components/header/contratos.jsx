import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../header/contratos.css"; // Asegúrate de tener tus estilos en el archivo contratos.css
import Chat from '../consultor/Chat';  // Asegúrate de importar tu componente Chat

function Contratos() {
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Generador De Casos Familiares</div>
          <ul className="nav-links-horizontal">
            <li><Link to="/dashboard">Consultor Legal</Link></li>
            <li><Link to="/simulador-de-casos">Simulador De Casos Reales</Link></li>
            <li><Link to="/foro-social">Foro Social</Link></li>
            <li><Link to="/notificaciones">Notificaciones</Link></li>
            <li><Link to="/perfil-configuracion">Perfil y Configuración</Link></li>
          </ul>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="sidebar">
          <h3>Chats</h3>
          <ul>
            <li>Chat 1: Hola AVLIA, tengo una pregunta sobre las pensiones después de un divorcio.</li>
            <li>Chat 2: Buenas tardes, ¿cuál es el procedimiento para realizar una denuncia por fraude?</li>
          </ul>
          <Link to="/new-chat" className="new-chat-button">Nuevo Chat</Link>
        </div>

        <div className="main-content">
          <div className="consultor-legal">
            <h2>Generador de Casos</h2>
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contratos;
