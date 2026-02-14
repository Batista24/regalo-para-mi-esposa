const questions = [
    { q: "¿En qué año nos conocimos?", 
        options: ["2020", "2021", "2022"], 
        correct: 1 },
    { q: "¿Qué fue lo primero que te pedí cuando te vi?", 
        options: ["Tu número", "Que sea mi novia"], 
        correct: 0 },
    { q: "¿Qué fecha te pedí que seas mi novia?", 
        options: ["11-09-2021", "21-06-2022", "21-08-2022"], 
        correct: 2 },
    { q: "¿Cuál es mi comida favorita que tú cocinas?", 
        options: ["Sardina con pan", "Lasaña", "Arroz"], 
        correct: 1 },
    { q: "¿Cuál es nuestro lugar favorito para pasear?", 
        options: ["El parque", "El cine", "La playa"], correct: 2 },
    { q: "¿Quién dijo 'Te amo' primero?", 
        options: ["Tú", "Yo", "Al mismo tiempo"], 
        correct: 1 },
    { q: "¿Donde nos vimos por primera vez?", 
        options: ["Residencia de varones", "Limpieza", "Residencia de Señoritas"], 
        correct: 1 },
    { q: "¿Qué es lo que más me gusta de ti?", 
        options: ["Tu sonrisa", "Tu forma de ser", "Todo lo anterior"], 
        correct: 2 }
];

let currentQuestion = 0;

function loadQuestion() {
    const qData = questions[currentQuestion];
    const questionEl = document.getElementById("question");
    const optionsDiv = document.getElementById("options");

    if (!questionEl || !optionsDiv) return; // Seguridad

    questionEl.innerText = qData.q;
    optionsDiv.innerHTML = "";

    // Actualizar barra de progreso
    const progress = (currentQuestion / questions.length) * 100;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = progress + "%";

    qData.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

// 8 frases únicas para las 8 preguntas (en orden)
const successPhrases = [
    "¡Exacto, mi vida! Sabía que te acordarías de ese momento. ❤️",
    "¡Eres increíble! Me conoces mejor que nadie en este mundo. 🥰",
    "¡Correcto, amor! Esa fecha quedó grabada en mi corazón para siempre. 🌹",
    "¡Eso es! Sabía que te acordarías de mi comida favorita hecha por ti. 💖",
    "¡Muy bien! Ese lugar es mágico porque estoy contigo. ✨",
    "¡Cierto! Fue un momento que cambió mi vida por completo. 😍",
   "¡Eres la ganadora de mi corazón hoy y siempre! Te amo. 👑",
    "¡Lo lograste, mi reina! Me gusta absolutamente TODO de ti. 👑"
];

function checkAnswer(index) {
    if (index === questions[currentQuestion].correct) {
        // Usamos la frase que corresponde al número de pregunta actual
        const phraseForThisQuestion = successPhrases[currentQuestion];
        
        // Mostramos la frase personalizada
        alert(phraseForThisQuestion);

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        // Si se equivoca, le damos ánimos
        alert("¡Casi! Intenta otra vez, mi cielo ❤️");
    }
}

function showResult() {
    // Frase final de felicitación
    alert("¡Felicidades, amor! Has respondido todo perfecto. Ahora, toca nuestra foto para una sorpresa... ❤️");
    
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("title").innerText = "¡Lo lograste, mi reina!";
    document.getElementById("result").classList.remove("hidden");
    
    const foto = document.getElementById("love-img");
    if (foto) {
        foto.onclick = function() {
            document.getElementById("carta-amor").classList.remove("hidden-carta");
        };
    }
}

// Función para cerrar la carta
const btnCerrar = document.getElementById("cerrar-carta");
if (btnCerrar) {
    btnCerrar.onclick = function() {
        document.getElementById("carta-amor").classList.add("hidden-carta");
    };
}

// --- EFECTO DE CORAZONES (Para que no de error) ---
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}


// Crear corazones cada 500ms
setInterval(createHeart, 500);

// Iniciar juego
window.onload = loadQuestion;

const musicBtn = document.getElementById("music-control");
const musicIcon = document.getElementById("music-icon");
const song = document.getElementById("love-song");

musicBtn.onclick = function() {
    if (song.paused) {
        song.play();
        musicIcon.innerText = "⏸️"; // Cambia a icono de pausa
        musicBtn.classList.add("playing");
    } else {
        song.pause();
        musicIcon.innerText = "▶️"; // Cambia a icono de play
        musicBtn.classList.remove("playing");
    }
};

document.getElementById("start-game-btn").onclick = function() {
    // 1. Esconder la pantalla de bienvenida con un efecto suave
    const welcome = document.getElementById("welcome-screen");
    welcome.style.opacity = "0";
    setTimeout(() => {
        welcome.style.display = "none";
    }, 800);

    // 2. Iniciar la música automáticamente
    const song = document.getElementById("love-song");
    const musicIcon = document.getElementById("music-icon");
    const musicBtn = document.getElementById("music-control");

    if (song) {
        song.play();
        if (musicIcon) musicIcon.innerText = "⏸️";
        if (musicBtn) musicBtn.classList.add("playing");
    }
};