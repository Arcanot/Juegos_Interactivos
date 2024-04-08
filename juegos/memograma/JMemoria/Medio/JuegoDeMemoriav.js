
let tarjetaDestapadas=0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let timer = 90;
let tiempoInicial = 20;
let temporizador = false;
let tiempoRegresivoId = null;


let mostrarmovimiento = document.getElementById('movimientos');
let mostraraciertos = document.getElementById('aciertos');
let mostrartiempo =document.getElementById('t-restante');

let correcto = new Audio('Audio/Correcto.wav');
let Error = new Audio('Audio/Error.wav');
let gano = new Audio('Audio/sfx-victory1.mp3');
let fondo = new Audio('Audio/fondo.wav');

const Emergente_container = document.getElementById('Emergente_container');
const cerrar = document.getElementById('cerrar');

let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);


function bloqueartarjeta(){
    for(let i=0;i<=35;i++){
        let tarjetabloqueada =document.getElementById(i);
        tarjetabloqueada.innerHTML=`<img src="JuegoDeMemoriav/${numeros[i]}.png">`;
        tarjetabloqueada.disabled = true;
    }
}


function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML = `Tiempo:  ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloqueartarjeta();
        }
    },1000)
}

function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetaDestapadas++;
    console.log(tarjetaDestapadas);
    if(tarjetaDestapadas==1){
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id]
        tarjeta1.innerHTML = `<img src="JuegoDeMemoriav/${primerResultado}.png">`;
        tarjeta1.disabled = true;
    }else if(tarjetaDestapadas==2){
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img src="JuegoDeMemoriav/${segundoResultado}.png">`;
        tarjeta2.disabled =true;
        movimientos++;
        mostrarmovimiento.innerHTML= `Movimientos:  ${movimientos}`;
        if(primerResultado==segundoResultado){
            tarjetaDestapadas=0;
            aciertos++;
            mostraraciertos.innerHTML = `Aciertos:  ${aciertos}`;
            correcto.play();
            if(aciertos == 32){
                gano.play();
                clearInterval(tiempoRegresivoId);
                mostraraciertos.innerHTML= `Aciertos:  ${aciertos} WOW`;
                mostrartiempo.innerHTML=`Tiempo:  ${tiempoInicial-timer} segundos.`
                mostrarmovimiento.innerHTML= `Movimientos:  ${movimientos} WOW`;
                Emergente_container.classList.add('show');  
            }
        }else{
            Error.play();
            setTimeout(()=>{
                tarjeta1.innerHTML=' ';
                tarjeta2.innerHTML=' ';
                tarjeta1.disabled= false;
                tarjeta2.disabled= false;
                tarjetaDestapadas=0;
            },800);
        }
    }
}
cerrar.addEventListener('click', () => {
    Emergente_container.classList.remove('show');
});