
import GameOfLife from './gameOfLife/GameOfLife.js';

let game = null;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.game-start-block').classList.remove('d-none');
    document.querySelector('.game-start-block').classList.add('game-start-block--active');
})

document.getElementById('rows').addEventListener('input', (event) => checkRowColl(event));
document.getElementById('cols').addEventListener('input', (event) => checkRowColl(event));

document.getElementById('createField').addEventListener('click', () => {
    createGrid();
});

document.getElementById('randomFilling').addEventListener('click', () => {

    randomizeGrid();
    checkLiveCell();
});

document.getElementById('nextStep').addEventListener('click', () => {
    nextGeneration()
});

document.getElementById('starGame').addEventListener('click', () => {
    console.log('starGame');
    

    const gameStatsElement = document.querySelector('.game-stats');
    gameStatsElement.classList.remove('d-none');

    const gamePanelElement = document.querySelector('.game-panel');
    gamePanelElement.classList.add('d-none');

    const btnStopGame = document.getElementById('stopGame');
    btnStopGame.classList.remove('d-none')
    
    startGame();

});

document.getElementById('continionGame').addEventListener('click', () => {
    console.log('continionGame');

    const btnStopGame = document.getElementById('stopGame');
    btnStopGame.classList.remove('d-none')

    const btnGamePauseElement = document.querySelector('.game-pause');
    btnGamePauseElement.classList.add('d-none');

    const gameStatsElement = document.querySelector('.game-stats');
    gameStatsElement.classList.remove('d-none');

    const gamePanelElement = document.querySelector('.game-panel');
    gamePanelElement.classList.add('d-none');
    
    startGame();

});

document.getElementById('stopGame').addEventListener('click', () => {
    stopGame()

    const btnStopGame = document.getElementById('stopGame');
    btnStopGame.classList.add('d-none')

    const btnGamePause = document.querySelector('.game-pause');
    btnGamePause.classList.remove('d-none')
});

document.getElementById('clearField').addEventListener('click', () => {

    clearField();
    checkLiveCell();
});

document.getElementById('restartField').addEventListener('click', () => {

    clearField();
    checkLiveCell();

    const btnGamePauseElement = document.querySelector('.game-pause');
    btnGamePauseElement.classList.add('d-none');

    const gameStatsElement = document.querySelector('.game-stats');
    gameStatsElement.classList.add('d-none');

    const gamePanelElement = document.querySelector('.game-panel');
    gamePanelElement.classList.remove('d-none');
});

document.getElementById('newGame').addEventListener('click', () => {
    console.log('newGame')

    clearField();
    checkLiveCell();

    document.querySelector('.game-start-block').classList.remove('game-start-block--hidden');
    document.querySelector('.game-wrapper').classList.add('d-none');
    document.querySelector('.game-stats').classList.add('d-none');
    document.querySelector('.game-pause').classList.add('d-none');

});

document.getElementById('newGameCancel').addEventListener('click', () => {
    console.log('newGameCancel')

    clearField();
    checkLiveCell();

    document.querySelector('.game-start-block').classList.remove('game-start-block--hidden');
    document.querySelector('.game-wrapper').classList.add('d-none');
    document.querySelector('.game-stats').classList.add('d-none');
    document.querySelector('.game-pause').classList.add('d-none');
    document.getElementById('modalGameOver').classList.remove('show');
    
});

document.getElementById('restarGameCancel').addEventListener('click', () => {
    console.log('restarGameCancel')

    clearField();
    checkLiveCell();

    const btnGamePauseElement = document.querySelector('.game-pause');
    btnGamePauseElement.classList.add('d-none');

    const gameStatsElement = document.querySelector('.game-stats');
    gameStatsElement.classList.add('d-none');

    const gamePanelElement = document.querySelector('.game-panel');
    gamePanelElement.classList.remove('d-none');
    
    document.querySelector('.game-wrapper').classList.remove('d-none');


    document.getElementById('modalGameOver').classList.remove('show');
});

document.addEventListener('click', (event)=> {
    if(event.target.matches('.cell')) {
        checkLiveCell();
    }
});




function createGrid() {
    const rows = parseInt(document.getElementById('rows').value);
    const cols = parseInt(document.getElementById('cols').value);

    if (game ) {
        game.stop();
    }
    game = new GameOfLife(rows, cols);
    game.createGrid();
    document.querySelector('.game-start-block').classList.add('game-start-block--hidden');
    document.querySelector('.loader-wrapp').classList.remove('d-none');
    setTimeout(() => {
        document.querySelector('.loader-wrapp').classList.add('d-none');
        document.querySelector('.game-panel').classList.remove('d-none');
        document.querySelector('.game-wrapper').classList.remove('d-none');
    }, 500);

}

function randomizeGrid() {
    if (game) {
        game.randomizeGrid();
    }
}

function nextGeneration() {
    if (game) {
        game.step();
    }
}

function startGame() {
    if (game) {
        game.start();
    }
}

function stopGame() {
    if (game) {
        game.stop();
    }
}

function clearField() {
    if (game) {
        game.clearField();
    }
}

function checkLiveCell() {
    if (game) {
        
        game.checkLiveCell();
    }
}

function checkRowColl(event) {
    if(parseInt(event.target.value) > 100) {
        event.target.value = 100;
    } else if(parseInt(event.target.value) < 5) {
        event.target.value = 5;
    }
}

