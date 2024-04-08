// Objeto con las palabras a adivinar y sus imágenes correspondientes
const palabrasConImagenes = {
    "PELUQUERO": "pelu.png",
    "PERIODISTA": "peri.png",
    "ARQUITECTO": "arqu.png",
    "PANADERO": "pana.png",
    "MESERO": "mese.png",
    "CHEF": "che.png",
    "PILOTO": "pilo.png",
    "SECRETARIA": "secre.png",
    "FARMACEUTICO": "farma.png"

};

// Ruta base donde se encuentran las imágenes
const rutaBaseImagenes = "img/";

// Array de palabras a adivinar
let palabrasPorAdivinar = Object.keys(palabrasConImagenes);

// Función para seleccionar una palabra aleatoria
function seleccionarPalabraAleatoria() {
    const indice = Math.floor(Math.random() * palabrasPorAdivinar.length);
    const palabraSeleccionada = palabrasPorAdivinar[indice];
    palabrasPorAdivinar.splice(indice, 1); // Eliminar la palabra seleccionada para que no se repita
    return palabraSeleccionada;
}

// Función para verificar si todas las palabras han sido adivinadas
function todasPalabrasAdivinadas() {
    return palabrasPorAdivinar.length === 0;
}

// Inicializar la palabra actual y la imagen actual
let palabraActual = seleccionarPalabraAleatoria();
let imagenActual = rutaBaseImagenes + palabrasConImagenes[palabraActual];

// Arreglo para guardar las letras seleccionadas
let letrasSeleccionadas = [];

// Función para renderizar la palabra y las letras seleccionadas
function renderizar() {
    const wordElement = document.getElementById("word");
    wordElement.textContent = "";
    palabraActual.split("").forEach((letra, index) => {
        const letterBox = document.createElement("div");
        letterBox.classList.add("letter-box");
        if (letrasSeleccionadas[index]) {
            letterBox.textContent = letrasSeleccionadas[index];
        }
        wordElement.appendChild(letterBox);
    });

    // Mostrar la imagen correspondiente
    const imageElement = document.getElementById("imagen");
    imageElement.src = imagenActual;
}

// Función para generar los botones de letras
function generarBotones() {
    const letrasDesordenadas = desordenarPalabra(palabraActual);
    const lettersElement = document.getElementById("letters");
    lettersElement.innerHTML = "";
    letrasDesordenadas.split("").forEach(letra => {
        const button = document.createElement("button");
        button.textContent = letra;
        button.addEventListener("click", function() {
            seleccionarLetra(letra);
        });
        lettersElement.appendChild(button);
    });
}

// Función para desordenar una palabra
function desordenarPalabra(palabra) {
    return palabra.split('').sort(function() { return 0.5 - Math.random() }).join('');
}

// Función para seleccionar una letra
function seleccionarLetra(letra) {
    letrasSeleccionadas.push(letra);
    renderizar();
    if (letrasSeleccionadas.join("") === palabraActual) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "¡Felicidades! Has adivinado la palabra.";
        setTimeout(() => {
            letrasSeleccionadas = [];
            if (palabrasPorAdivinar.length > 0) {
                palabraActual = seleccionarPalabraAleatoria();
                imagenActual = rutaBaseImagenes + palabrasConImagenes[palabraActual];
                renderizar();
                generarBotones();
                messageElement.textContent = "";
            } else if (todasPalabrasAdivinadas()) {
                messageElement.innerHTML = "<p class='mensaje-grande'>¡Lo lograste!</p><button onclick='reiniciarJuego()'>Volver a Jugar</button>";
            }
        }, 1000);
    } else if (letrasSeleccionadas.join("").length === palabraActual.length) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = "¡Palabra incorrecta! Inténtalo de nuevo.";
        setTimeout(() => {
            letrasSeleccionadas = [];
            renderizar();
            generarBotones();
            messageElement.textContent = "";
        }, 1000);
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    palabrasPorAdivinar = Object.keys(palabrasConImagenes);
    palabraActual = seleccionarPalabraAleatoria();
    imagenActual = rutaBaseImagenes + palabrasConImagenes[palabraActual];
    letrasSeleccionadas = [];
    renderizar();
    generarBotones();
    const messageElement = document.getElementById("message");
    messageElement.textContent = "";
}

// Inicializar el juego
renderizar();
generarBotones();





