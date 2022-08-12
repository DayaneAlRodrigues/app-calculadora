const display = document.getElementById('result')
const teclas = document.querySelectorAll('[id *=tecla]');
const operadores = document.querySelectorAll('[id *=operador]');
const limpar = document.getElementById('limpar');
const voltar = document.getElementById('voltar');
const igual = document.getElementById('igual');
const decimal = document.getElementById('decimal');

let novoNumero = true;    //variavel para verificar se é um novoNumero e quando clicar no operador atualizar o display para um novo numero

let operador;    // variavel para guardar na memoria o operador utilizado

let numeroAnterior;   // variavel para guardar na memoria o numero anterior clicado

const operacaoPendente = () => operador !== undefined


const calcular = () => {
    
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(";", "."));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`)
        atualizaDisplay(resultado);
        /*
        if (operador === '+') {
            atualizaDisplay( numeroAnterior + numeroAtual)
        } else if (operador === '-') {
            atualizaDisplay( numeroAnterior - numeroAtual)
        }
        else if (operador === 'x') {
            atualizaDisplay( numeroAnterior * numeroAtual)
        }
        else if (operador === '/') {
            atualizaDisplay( numeroAnterior / numeroAtual)
        } */
    }
}

// limpar o display
const limparDisplay = () => {
    display.textContent = "";
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
limpar.addEventListener('click', limparDisplay)


// limpa o display após selecionar o operador para adicionar um novo numero
const atualizaDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString("BR");
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString("BR");
    }
    
}

const inserirNumero = (evento) => atualizaDisplay(evento.target.textContent);

const selecionarOperador = (evento) => {
    
    if (!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(";", "."));
    console.log(operador)
    console.log(numeroAnterior)
    }
} 

// capturar o click de cada uma das teclas
teclas.forEach( (numero) => 
    numero.addEventListener('click', inserirNumero)  
)

// capturar o operador 
operadores.forEach( (operador) => 
    operador.addEventListener('click', selecionarOperador)  
)

// chamar a função calcular e zerar o operador para não ter uma conta pendente
const ativarIgual = () => {
    calcular()
    operador = undefined; 
}

// escutador de evento da tecla igual
igual.addEventListener("click", ativarIgual)


// remover ultimo numero
const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
voltar.addEventListener("click", removerUltimoNumero)

// existe decimal / existe valor / inserir decimal 
const existeDecimal = () => display.textContent.indexOf(",") !== -1; // se existe traz o index senão será falso igual a -1

const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
    if(!existeDecimal()){
        if(existeValor()){
            atualizaDisplay(",");
        } else {
            atualizaDisplay("0;")
        }
    }
}
decimal.addEventListener("click", inserirDecimal)

// acionar teclado para operar como click

const mapaTeclado = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '/' : 'operadorDivisao',
    '*' : 'operadorMultiplicacao',
    '+' : 'operadorAdicionar',
    '-' : 'operadorSubtrair',
    '=' : 'igual',
    'Enter': 'igual',
    'Backspace' : 'voltar',
    'c' : "limpar",
    ';' : 'decimal'
}
const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) {
        document.getElementById(mapaTeclado[tecla]).click();
    }
    
}
document.addEventListener('keydown', mapearTeclado);



