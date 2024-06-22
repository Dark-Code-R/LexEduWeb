import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
import uuid
from groq import Groq  # Importa la biblioteca Groq

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración de la base de datos con la URL correcta de Railway
DATABASE_URL ='postgresql://postgres:ANaHmpSbcfDaRRCMTquGTvMexAgVhxvN@monorail.proxy.rlwy.net:37434/railway'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelos de base de datos
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class ChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=False)
    conversation_id = db.Column(db.String(36), nullable=False)

# Obtener GROQ_API_KEY desde las variables de entorno
GROQ_API_KEY = os.getenv('GROQ_API_KEY', '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')
GROQ_MODEL_ID = 'mixtral-8x7b-32768'

# Cargar información legal
def load_legal_info(directory='legal_texts'):
    legal_info = ""
    for filename in os.listdir(directory):
        if filename.endswith('.txt') and 'Diccionario' not in filename:
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                legal_info += file.read() + "\n\n"
    return legal_info[:2000]  # Aumentar la cantidad de información legal cargada

legal_info = load_legal_info()

terminos_juridicos = {}
def load_terminos_juridicos(directory='legal_texts'):
    for filename in os.listdir(directory):
        if filename.startswith('Diccionario') and filename.endswith('.txt'):
            with open(os.path.join(directory, filename), 'r', encoding='utf-8') as file:
                for line in file:
                    if ':' in line:
                        term, definition = line.split(':', 1)
                        terminos_juridicos[term.strip().lower()] = definition.strip()

load_terminos_juridicos()

prompt_template = """Eres un abogado experto en derecho familiar en Bolivia. Responde de manera precisa y directa a las preguntas legales que se te hagan, sin repetir información innecesaria. Proporciona consejos legales basados en tu amplio conocimiento y la información proporcionada. Realiza cálculos aproximados si es necesario y simula sentencias cuando sea apropiado. Si la pregunta no es legal, responde de manera amistosa y relevante. Dirígete al usuario por su nombre si es conocido. No incluyas saludos, despedidas o información personal sobre ti o sobre otros.\n\nInformación Legal:\n{legal_info}\n\n{chat_history}\n\nTú: {input}\nRespuesta precisa:"""

def get_user_name(chat_history_records):
    for record in chat_history_records:
        if 'me llamo' in record.content.lower() or 'mi nombre es' in record.content.lower():
            return record.content.split()[-1]
    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username, password=password).first()
    if user:
        return jsonify({"message": "Login successful", "user": username})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Register successful"}), 201

@app.route('/chat', methods=['POST'])
def get_chat_response():
    data = request.json
    user_input = data.get('user_input').strip().lower()
    username = data.get('user')
    conversation_id = data.get('conversation_id', str(uuid.uuid4()))

    if not username:
        return jsonify({'error': 'Username is required'}), 400

    # Obtener el historial de chat del usuario para la conversación actual
    chat_history_records = ChatHistory.query.filter_by(user=username, conversation_id=conversation_id).order_by(ChatHistory.id).all()
    user_name = get_user_name(chat_history_records)
    limited_chat_history = chat_history_records[-10:]  # Limitar a los últimos 10 mensajes

    terms_to_define = [term for term in terminos_juridicos if term in user_input.lower()]
    definitions = "\n".join([f"{term.capitalize()}: {terminos_juridicos[term]}" for term in terms_to_define])

    chat_history_str = "\n".join([f"{user_name if user_name and msg.role == 'user' else 'Tú'}: {msg.content}" if msg.role == 'user' else f"Harvey: {msg.content}" for msg in limited_chat_history])

    # Si se pregunta el nombre, responder con el nombre almacenado
    if 'cómo me llamo' in user_input or 'mi nombre' in user_input:
        if user_name:
            friend_response = f"Te llamas {user_name}, ¿en qué más puedo ayudarte?"
        else:
            friend_response = "No estoy seguro de tu nombre, ¿puedes decírmelo?"
        return jsonify({'response': friend_response, 'conversation_id': conversation_id})

    # Actualizar el prompt para mantener el contexto
    prompt = prompt_template.format(legal_info=legal_info, chat_history=chat_history_str, input=user_input[:1000])

    try:
        client = Groq(api_key=GROQ_API_KEY)
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": f"Eres un abogado experto en derecho familiar en Bolivia. Responde de manera precisa y directa a las preguntas legales que se te hagan, sin repetir información innecesaria. Proporciona consejos legales basados en tu amplio conocimiento y la información proporcionada. Realiza cálculos aproximados si es necesario y simula sentencias cuando sea apropiado. Si la pregunta no es legal, responde de manera amistosa y relevante. Dirígete al usuario por su nombre si es conocido. No incluyas saludos, despedidas o información personal sobre ti o sobre otros.\n\nInformación Legal:\n{legal_info}"},
                {"role": "user", "content": user_input[:1000]},
                {"role": "assistant", "content": chat_history_str}
            ],
            model=GROQ_MODEL_ID,
            max_tokens=4096,  # Aumentar el número de tokens para permitir respuestas más largas
            temperature=0.5  # Ajustar la temperatura para respuestas más precisas
        )

        friend_response = chat_completion.choices[0].message.content.strip()

        # Verificar si la respuesta está cortada y pedir más tokens si es necesario
        while friend_response.endswith("...") or len(friend_response.split()) >= 1000:
            more_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": f"Continúa la respuesta a la pregunta: {user_input[:1000]}"},
                    {"role": "assistant", "content": friend_response}
                ],
                model=GROQ_MODEL_ID,
                max_tokens=4096,  # Permitir una extensión adicional de la respuesta
                temperature=0.5
            )
            friend_response += " " + more_completion.choices[0].message.content.strip()

        if definitions:
            friend_response += "\n\nDefiniciones:\n" + definitions

        friend_response += "\n\nFuentes:\n- Ley N° 603, Código de las Familias y del Proceso Familiar (Bolivia, 2014). Recuperado de: [Gaceta Oficial de Bolivia](http://www.gacetaoficialdebolivia.gob.bo/normas/buscar/603)"

        # Guardar la pregunta y respuesta en la base de datos
        user_message = ChatHistory(user=username, role='user', content=user_input, conversation_id=conversation_id)
        harvey_response = ChatHistory(user=username, role='assistant', content=friend_response, conversation_id=conversation_id)
        db.session.add(user_message)
        db.session.add(harvey_response)
        db.session.commit()

        return jsonify({'response': friend_response, 'conversation_id': conversation_id})
    except Exception as e:
        print(f"Error al conectar con Groq: {e}")
        return jsonify({'response': f"Error en la conexión con el servidor de Groq: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)