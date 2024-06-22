// Formulario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';
import Spline from '@splinetool/react-spline'; // Asegúrate de que la ruta sea correcta

export function Formulario({ setUser }) {
    const [nombre, setNombre] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === "" || contraseña === "") {
            setError(true);
            return;
        }
        setError(false);

        const response = await fetch('https://web-production-c396.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: nombre, password: contraseña })
        });

        const data = await response.json();

        if (response.ok) {
            setUser([nombre]);
            navigate('/home'); // Redirige al componente Home después de iniciar sesión correctamente
        } else {
            setError(true);
        }
    }

    const handleRegister = () => {
        navigate('/register'); // Redirige al componente Registrar
    }

    return (
        <div className="container">
            <div className="form-container">
                <div className="spline-container">
                    <Spline scene="https://prod.spline.design/3fU0RJQfF-rCT0Tk/scene.splinecode" />
                </div>
                <div className="welcome-message">Bienvenido a LexEdu</div>
                <h1>Login</h1>
                <form className="Formulario" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder="Nombre de usuario"
                    />
                    <input
                        type="password"
                        value={contraseña}
                        onChange={e => setContraseña(e.target.value)}
                        placeholder="Contraseña"
                    />
                    <button type="submit">Iniciar sesión</button>
                    <button type="button" onClick={handleRegister}>Registrar</button>
                </form>
                {error && <p>Todos los campos son obligatorios o las credenciales son incorrectas</p>}
            </div>
        </div>
    );
}

export default Formulario;
