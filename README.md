# Landru: Star Trek-Inspired AI Chat Assistant

**Created by Jye Crocker** for the *Generative AI for Games & Media* final project.

Landru is a sci-fi chatbot powered by OpenAI and ElevenLabs APIs, inspired by the machine-ruler Landru from the original Star Trek series. It features a fully animated TOS-intro style interface, generates text, synthesizes audio responses, and produces visualizations for your queries in real-time.

---

## 🚀 Features

- 🤖 Chat with "Landru" through an immersive Star Trek interface
- 🎙️ Audio playback via ElevenLabs text-to-speech
- 🖼️ Image generation based on prompts (using OpenAI’s image model)
- 🌌 Animated starfield background in the style of the TOS intro
- 🖖 Star Trek sounds and UI inspired by LCARS system design

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Jyefett/landru-chatbot.git
cd landru-ai
```

### 2. Set up your environment
Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory with:
```env
OPENAI_API_KEY=your_openai_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
ELEVENLABS_VOICE_ID=your_preferred_voice_id
```

### 3. Launch the Flask server
```bash
.\venv\Scripts\activate
python app.py
```
This starts the backend server at `http://localhost:5000`

### 4. View the frontend
Open your browser and go to:
```
http://localhost:5000
```

---

## 🧩 Project Structure

```
Project_Landru/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    └── public/
        ├── index.html
        ├── style.css
        ├── app.js
        ├── assets/
        │   └── tos_chirp_2.mp3
```

---

## 🧠 Maintenance Tips

- To update visuals/sounds, add new files to `frontend/public/assets/`
- If starfield animation isn't fullscreen, ensure canvas is outside any layout constraints and that the script updates its size correctly
- To adjust Landru's personality, edit the `LANDRU_PROMPT` string in `app.py`
- To change the voice, use a different ElevenLabs voice ID

---

## 📌 Notes

- Requires internet connection to access OpenAI and ElevenLabs APIs
- Audio may be blocked by browsers unless interaction occurs
- Costs may apply depending on your API usage limits

---

## 🖖 Credits

- Developed by **Jye Crocker**
- Course: *Generative AI for Games & Media - Spring 2025 @ Rochester Institute of Technology*

This project was created as a tribute to the Star Trek universe. Characters, themes, and stylistic elements such as Landru and LCARS are inspired by the intellectual property of Star Trek.

All rights to Star Trek, including names, characters, and design language, belong to Paramount Global and CBS Studios. This project is for educational purposes only and is not affiliated with or endorsed by the official Star Trek franchise.

> “Landru seeks tranquility… of The Body.”

