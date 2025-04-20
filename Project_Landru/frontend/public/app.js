const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const generatedImage = document.getElementById('generated-image');
const audioPlayer = document.getElementById('audio-player');

async function sendQuery() {
    const query = userInput.value;
    if (!query) return;

    addMessage(query, 'user');
    userInput.value = '';
    
    // Show loading indicator
    const statusLine = document.querySelector('.lcars-bootline');
    statusLine.textContent = 'LANDRU IS PROCESSING YOUR INQUIRY';


    try {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();

        if (data.error) {
            console.error('Server error:', data.error);
            addMessage(`Error: ${data.error}`, 'error');
            return;
        }

        addMessage(data.text, 'landru');

        if (data.image) {
            generatedImage.src = data.image;
        }

        if (data.audio) {
            audioPlayer.src = data.audio;
            try {
                await audioPlayer.play();
            } catch (err) {
                console.warn("Audio playback was blocked:", err);
            }
        }

    } catch (error) {
        console.error('Assimilation error:', error);
        addMessage('The Body feels disturbances... Try again later.', 'error');
    } finally {
        // Hide loading indicator whether successful or not
        statusLine.textContent = 'SYSTEM READY — WAITING FOR INQUIRY';
    }
}

function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = content;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    const engageSound = new Audio('/static/tos_chirp_2.mp3');

    document.getElementById('submit-btn').addEventListener('click', () => {
        engageSound.play();
        sendQuery();
    });

    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendQuery();
    });
});

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();

const starColors = ['#ffffff', '#ccddee', '#aaffff', '#ffeecc'];

let stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * 2000 + 500,
    speed: 0.05 + Math.random() * 0.1,
    color: starColors[Math.floor(Math.random() * starColors.length)],
    baseSize: Math.random() * 1.5 + 0.5 // size between 0.5 and 2.0
  });
}

function moveStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let star of stars) {
        star.z += star.speed; // Stars moving inward (toward viewer)
        
        // When stars get too close, reset them
        if (star.z > 2000) {
            star.baseSize = Math.random() * 1.5 + 0.5;
            star.x = Math.random() * canvas.width - canvas.width / 2;
            star.y = Math.random() * canvas.height - canvas.height / 2;
            star.z = 100; // Start them far away
            star.speed = 0.05 + Math.random() * 0.7;
            star.color = starColors[Math.floor(Math.random() * starColors.length)];
        }

        // Perspective projection - smaller k means closer objects appear larger
        const k = 1000 / star.z; // Changed from division to multiplication
        const px = star.x * k + canvas.width / 2;
        const py = star.y * k + canvas.height / 2;
  
        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
            const size = Math.max((star.z / 2000) * 3, 0.5); // Closer stars are larger
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.globalAlpha = Math.min(1, (2000 - star.z) / 2000); // Closer stars are more opaque
            ctx.arc(px, py, size, 0, 2 * Math.PI);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
  
    requestAnimationFrame(moveStars);
}
  

moveStars();
window.addEventListener('resize', resizeCanvas);
