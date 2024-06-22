import React, { useState } from 'react';
import "../consultor/Chat.css"; // Si tienes un archivo CSS específico para el chat, cámbialo aquí

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'Me', text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch('https://web-production-c396.up.railway.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: input, user: 'guest' }),  // Añade el nombre de usuario
      });

      const data = await response.json();
      if (data.error) {
        setMessages([...newMessages, { sender: 'Error', text: data.error }]);
      } else {
        const formattedResponse = data.response.replace(/\n/g, '\n\n').replace(/(\d+)\./g, '\n$1.'); // Formatear la respuesta para mayor claridad
        const newMessagesWithResponse = [...newMessages, { sender: 'Amigo Virtual', text: formattedResponse }];
        setMessages(newMessagesWithResponse);
      }
    } catch (error) {
      setMessages([...newMessages, { sender: 'Error', text: 'Error al conectar con el servidor' }]);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'Me' ? 'sent' : 'received'}`}>
            <p><strong>{message.sender}:</strong> {message.text}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Escribe tu mensaje aquí..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;
