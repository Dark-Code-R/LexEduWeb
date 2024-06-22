import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ForoSocial.css";

function ForoSocial() {
  const [posts, setPosts] = useState([
    { id: 1, title: "Bienvenidos al foro de LexEdu", content: "Este es un espacio para discutir temas legales y compartir conocimientos.", comments: [] },
    { id: 2, title: "¿Cómo iniciar un proceso de divorcio?", content: "Tengo dudas sobre los pasos a seguir para iniciar un proceso de divorcio en Bolivia.", comments: [] }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComments, setNewComments] = useState({}); // Almacena comentarios para cada post

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPostId = posts.length + 1;
    setPosts([...posts, { id: newPostId, title: newPost.title, content: newPost.content, comments: [] }]);
    setNewPost({ title: '', content: '' });
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prevState => ({ ...prevState, [postId]: value }));
  };

  const handleCommentSubmit = (postId) => {
    const comment = newComments[postId] || '';
    if (comment.trim()) {
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, comment] };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComments(prevState => ({ ...prevState, [postId]: '' }));
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="container">
          <div className="logo">Red Social</div>
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
          <div className="foro-social">
            <h2>Foro Social</h2>
            <form className="new-post-form" onSubmit={handlePostSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={newPost.title}
                onChange={handlePostChange}
                required
              />
              <textarea
                name="content"
                placeholder="Contenido"
                value={newPost.content}
                onChange={handlePostChange}
                required
              />
              <button type="submit">Publicar</button>
            </form>
            <div className="posts-list">
              {posts.map(post => (
                <div key={post.id} className="post">
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="comments-section">
                    {post.comments.map((comment, index) => (
                      <p key={index}><strong>Comentario:</strong> {comment}</p>
                    ))}
                    <input
                      type="text"
                      placeholder="Escribe tu comentario..."
                      value={newComments[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    />
                    <button onClick={() => handleCommentSubmit(post.id)}>Comentar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForoSocial;
