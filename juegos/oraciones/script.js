const questions = [
    {
        sentence: 'Ayer, _____ fui a comprar dulces.',
        options: ['yo', 'tú', 'él'],
        correctAnswer: 'yo'
    },
    {
        sentence: 'Mi hermana tiene 3 años más que _____.',
        options: ['ti', 'mi', 'yo'],
        correctAnswer: 'yo'
    },
    {
        sentence: ' Las cerezas _____  gustan mucho.',
        options: ['la', 'me', 'los'],
        correctAnswer: 'me'
    },
    {
        sentence: '¿Has traído la revista que te dejé?  Sí, _____ he traído',
        options: ['lo', 'la', 'las'],
        correctAnswer: 'la'
    },
    {
        sentence: ' _____ siempre van a correr los domingos.',
        options: ['Tú', 'Nosotros', 'Ellos'],
        correctAnswer: 'Ellos'
    },
    {
        sentence: ' _____ dieron un premio.',
        options: ['Nos', 'La', 'Se'],
        correctAnswer: 'Nos'
    },
    {
        sentence: 'A _____ nos gustan los deportes',
        options: ['ustedes', 'ellos', 'nosotros'],
        correctAnswer: 'nosotros'
    },
    {
        sentence: '¿Dónde has dejado los zapatos? _____ he dejado en el dormitorio.',
        options: ['Los', 'Le', 'Lo'],
        correctAnswer: 'Los'
    },
    {
        sentence: ' _____ dije que venga esta tarde.',
        options: ['Se', 'Te', 'Le'],
        correctAnswer: 'Le'
    },
    {
        sentence: '¿Has vuelto a ver a tu amiga de la escuela?  Sí, _____ vi hace una semana en la calle.',
        options: ['lo', 'le', 'la'],
        correctAnswer: 'la'
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.sentence;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Limpiar las opciones anteriores
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    const feedback = document.getElementById('feedback');
    if (answer === question.correctAnswer) {
        feedback.innerText = '¡Correcto!';
        // Completa la frase con la respuesta correcta
        const sentence = question.sentence.replace('_____', question.correctAnswer);
        document.getElementById('question').innerText = sentence;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(() => {
                loadQuestion();
                feedback.innerText = '';
            }, 1000);
        } else {
            document.getElementById('options').innerHTML = '<p>¡FELICIDADES!, has completado el juego</p>';
        }
    } else {
        feedback.innerText = 'Por favor, inténtelo otra vez.';
    }
}


document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameTitle').style.display = 'block';
    loadQuestion();
}
