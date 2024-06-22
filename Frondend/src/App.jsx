import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Formulario } from './components/Login/Formulario';
import { Home } from './components/Home/Home';
import Dashboard from './components/dashboard/dashboard';
import Contratos from './components/header/contratos';
import { Registrar } from './components/Login/Registrar'; // Importar el componente de registro
import ThreeBackground from './components/Login/ThreeBackground';
import SimuladorDeCasos from './components/Simulador/SimuladorDeCasos';
import ForoSocial from './components/Foro/ForoSocial';
import Notificaciones from './components/consultor/Notificaciones/Notificaciones';
import PerfilYConfiguracion from './components/ajustes/PerfilYConfiguracion';

function App() {
  const [user, setUser] = useState([]);

  return (
    <Router>
      <div className="App">
        <ThreeBackground /> {/* Incluir el fondo animado */}
        <Routes>
          <Route exact path="/" element={user.length > 0 ? <Home user={user} setUser={setUser} /> : <Formulario setUser={setUser} />} />
          <Route path="/home" element={<Home user={user} setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contratos" element={<Contratos />} />
          <Route path="/perfil-configuracion" element={<PerfilYConfiguracion />} />
          <Route path="/notificaciones" element={<Notificaciones />} /> {/* Nueva ruta para notificaciones */}
          <Route path="/foro-social" element={<ForoSocial />} /> {/* Nueva ruta para el foro social */}
          <Route path="/register" element={<Registrar setUser={setUser} />} /> {/* Nueva ruta para el registro */}
          <Route path="/simulador-de-casos" element={<SimuladorDeCasos />} /> {/* Nueva ruta para el simulador de casos */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
