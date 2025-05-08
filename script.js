//Play Board é a TELA ou tabuleiro
/* Conteiner onde a cobra e a comida serão renderizadas */
const playBoard = document.querySelector(".play-board");
// Pontuação atual do jogador
const scoreElement = document.querySelector(".score");
//Record (maior pontuação) 
const highScoreElement = document.querySelector(".high-score");
//Controle de movimento
/* Seleciona elementos <i> Icones Botões para Devices Mobiles */
const controls = document.querySelectorAll(".controls i");

//Cadastro de Variaveis

/* Variavel Boleana que indica se o jogo terminou */
let gameOver = false;
// Variavel para armazenar as coordenadas X e Y da Comida
let foodX, foddY;
//Armazena as coordenadas X e Y da cabeça da cobra(posição inical de 5)
let snakeX = 5, snakeY = 5;
/* variavel para armazenar a velocidade nas direções X e Y, inicialmente em 0, pq a cobra está parada */
let velocityX = 0, velocity = 0;
// uma Array para armazenar as coordenaadas de cada segmento do corpo, primeiro elemento é a cabeça
let snakeBody = [];
/* variavel para armazenar o ID do intervalo que será usado para atualizar o jogo em um determinado ritmo */
let setIntervalId;
//Uma variavel para manter o controle da pontuação atual do jogador
let score = 0;


// Obtenha pontuação alta do armazenamento local
/* Tenta recuperar o valor associado à chave "high-score" do armazenamento local do navegador */
let highScore = localStorage.getItem("high-score") || 0;
/* Se o localStorage retornar NULL (caso ele nao exista), a variavel highScore sera definida como 0 */


// Posição aleatoria entre 1 e 30 para a comida
/* Gera Coordenadas aleatórias para a nova posição da comida */
const updateFoodPosition = () => {
    // Math.random() = retorna um numero de ponto flutuante pseudoaleatório entre 0 e 1
    // * 30; Multiplica o número aleatório por 30 para obter um valor entre 0 e quase 30
    // Math.floor(): Arredonda o resultado para o inteiro mais proximo (entre 0 e 29)
    // + 1: Adiciona 1 para garantir que as coordenadas da comida estejam entre 1 e 30.
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

//Função para lidar com o Fim do jogo
/* Função handleGameOver = quando a cobra colide consigo mesma ou com as paredes do tabuleiro */

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! 😫 Aperte Ok para iniciar novamente...");
    location.reload();
}

// Função para Mudar a direção da cobrinha
const changeDirection = e => {
    if (e.key === "ArrouwUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "AroowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;  
    } else if (e.key === "Aroowleft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "AroowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key})));

//Começar o Game = init Game
const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"`;

    // Quando a cobra come
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); 
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;
        highScoreElement.innerHTML = `High Score: ${highScore}`;
    }

    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }
}