import React from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import './home.css';

export function Home({ user, setUser }) {
    const handleLogout = () => {
        setUser([]);
    };

    return (
        <div className="resumen-container">
            <div className="spline-section">
                <div className="spline-container">
                    <Spline scene="https://prod.spline.design/cL0F026GzbOcIyzH/scene.splinecode" />
                </div>
            </div>

            <div className="content-section">
                <div className="logout-container">
                    <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
                </div>

                <div className="content-container">
                    <h2>Bienvenido, {user[0]}!</h2>
                    <p>
                        LexEdu es una plataforma educativa innovadora diseñada especialmente para los estudiantes de derecho en Bolivia. Nuestro objetivo es combinar tecnología avanzada con métodos de enseñanza interactivos para ofrecerte una experiencia de aprendizaje única y efectiva.
                    </p>
                    <p>
                        <strong>Descubre lo que LexEdu tiene para ti:</strong>
                    </p>
                    <ul>
                        <li><strong>Nova, tu asistente virtual:</strong> Nova, impulsado por inteligencia artificial, está aquí para ayudarte con todas tus consultas legales. Con respuestas precisas y contextualizadas, Nova convierte el aprendizaje teórico en una experiencia práctica y enriquecedora.</li>
                        <li><strong>Simulaciones de casos legales:</strong> Participa en juicios virtuales realistas donde puedes asumir diferentes roles. Estas simulaciones te permitirán aplicar tus conocimientos teóricos en situaciones prácticas, preparándote mejor para tu futura carrera.</li>
                        <li><strong>Foro de discusión:</strong> Únete a nuestra comunidad académica para discutir temas relevantes, resolver dudas y acceder a recursos adicionales. Interactúa con otros estudiantes y enriquece tu experiencia educativa.</li>
                    </ul>
                    <p>
                        LexEdu está disponible tanto en web como en dispositivos móviles, asegurando que puedas aprender en cualquier momento y lugar. Nuestro enfoque en la accesibilidad y la flexibilidad garantiza una educación continua adaptada a tus necesidades.
                    </p>
                    <p>
                        <strong>¿Listo para transformar tu forma de aprender derecho?</strong> Explora el mundo de LexEdu y prepárate para los desafíos del mundo legal contemporáneo con la mejor combinación de tecnología y educación.
                    </p>
                    <div className="button-container">
                        <Link to="/dashboard"><button className="btn-dashboard">Ir al Dashboard</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
