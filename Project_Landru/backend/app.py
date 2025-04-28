from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
from elevenlabs import generate, Voice, VoiceSettings, set_api_key
from dotenv import load_dotenv
import os
import base64

# Load environment variables
load_dotenv()

# Set ElevenLabs API Key globally
set_api_key(os.getenv("ELEVENLABS_API_KEY"))

# OpenAI client
client_oai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Flask app setup
app = Flask(__name__,
            static_folder='../frontend/public',
            static_url_path='/static')
CORS(app)

LANDRU_PROMPT = """You are Landru..."""  # Customize as needed

@app.route('/')
def serve_frontend():
    return send_from_directory('../frontend/public', 'index.html')

@app.route('/generate', methods=['POST'])
def generate_response():
    try:
        data = request.json
        user_query = data.get('query', '')

        # Text Generation
        chat_response = client_oai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": LANDRU_PROMPT},
                {"role": "user", "content": user_query}
            ]
        )
        text_response = chat_response.choices[0].message.content

        # Image Generation
        image_response = client_oai.images.generate(
            prompt=f"Star Trek TOS-style technical illustration of {user_query}",
            n=1,
            size="1024x1024"
        )
        image_url = image_response.data[0].url

        # Audio Generation
        audio = generate(
            text=text_response,
            voice=Voice(
                voice_id=os.getenv("ELEVENLABS_VOICE_ID"),
                settings=VoiceSettings(
                    stability=0.5,
                    similarity_boost=0.75
                )
            )
        )

        encoded_audio = base64.b64encode(audio).decode('utf-8')

        return jsonify({
            "text": text_response,
            "image": image_url,
            "audio": f"data:audio/mpeg;base64,{encoded_audio}"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
