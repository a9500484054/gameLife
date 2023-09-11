import Cell from './Cell.js';


export default class GameOfLife {

    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.grid = []
        this.generation = 0
        this.timerId = null
        this.startTime = 0
        this.endTime = 0
        this.liveСell = 0
        
        this.generationDataField()

    }

    generationDataField() {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j] = new Cell(i, j)
            }
        }
    }

    getNeighbors(row, col) {
        const neighbors = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    const neighborRow = (row + i + this.rows) % this.rows;
                    const neighborCol = (col + j + this.cols) % this.cols;
                    neighbors.push(this.grid[neighborRow][neighborCol])
                }
            }
        }
        return neighbors;
    }

    countLivingNeighbors(row, col) {
        return this.getNeighbors(row, col).filter(cell => cell.isAlive).length;
    }

    toggleCellState(row, col) {
        this.grid[row][col].isAlive = !this.grid[row][col].isAlive;
        this.updateCellColor(row, col);
    }

    updateCellColor(row, col) {
        const cell = this.grid[row][col];
        const cellElement = document.getElementById(`cell-${row}-${col}`)
        if(cell.isAlive) {
            cellElement.style.backgroundColor = 'black';
            cellElement.classList.remove('white')
            cellElement.classList.add('black')
        } else {
            cellElement.style.backgroundColor = 'white';
            cellElement.classList.add('white')
            cellElement.classList.remove('black')
        }
    }

    randomizeGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.grid[i][j].isAlive = Math.random() > 0.5
                this.updateCellColor(i, j)
            }
        }
    }

    step() {
        const newGrid = [];
        this.liveСell = 0;
        for (let i = 0; i < this.rows; i++) {
            newGrid[i] = [];
            for (let j = 0; j < this.cols; j++) {
                const cell = this.grid[i][j];
                const livingNeighbors = this.countLivingNeighbors(i, j)
                newGrid[i][j] = new Cell(i, j)

                if (cell.isAlive) {
                    if (livingNeighbors === 2 || livingNeighbors === 3) {
                        newGrid[i][j].isAlive = true
                        this.liveСell++
                    }
                } else {
                    if (livingNeighbors === 3) {
                        newGrid[i][j].isAlive = true
                        this.liveСell++
                    }
                }

                this.updateCellColor(i, j)
            }
        }

        this.grid = newGrid
        this.generation++
        this.endTime = performance.now()
        this.updateGenerationTime()
        this.updateCountСells()
        this.checkCancelGame()



    }

    checkCancelGame() {
        if(!this.liveСell) {
            this.clearField()
            this.stop()

            const gameStatsElement = document.querySelector('.game-stats')
            gameStatsElement.classList.add('d-none')

            const gameWrapperElement = document.querySelector('.game-wrapper')
            gameWrapperElement.classList.add('d-none')

            const gameOver = document.getElementById('modalGameOver')
            gameOver.classList.add('show')

        }
    }

    updateGenerationTime() {
        const generationTimeElement = document.getElementById('generationTime')
        generationTimeElement.textContent = `${Math.round(this.endTime - this.startTime)} мс`
    }

    updateCountСells() {
        const liveCountСellElement = document.getElementById('liveCountСell')
        const deadCountСellElement = document.getElementById('deadCountСell')
        liveCountСellElement.textContent = `${this.liveСell} шт`
        deadCountСellElement.textContent = `${this.rows * this.cols - this.liveСell} шт`
    }

    start() {
        this.timerId = setInterval(() => {
            this.startTime = performance.now();
            this.step();
        }, 100);
    }

    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    createGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.style.width = `${this.cols * 20}px`;
        gridElement.innerHTML = '';

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cellElement = document.createElement('div');
                cellElement.className = 'cell';
                cellElement.id = `cell-${i}-${j}`;
                cellElement.addEventListener('click', () => this.toggleCellState(i, j));
                gridElement.appendChild(cellElement);
            }
        }

    }

    clearField() {
        const gridElement = document.getElementById('grid');
        gridElement.querySelectorAll('.cell').forEach(el => {
            el.style.backgroundColor = "white";
            el.classList.remove('black');
            el.classList.add('white');
        });
        this.liveСell = 0;
        this.grid = [];
        this.generationDataField();
    }
    
    checkLiveCell() {
        const btnStarGame = document.getElementById('starGame');
        const btnClearField = document.getElementById('clearField');

        this.liveСell = document.querySelectorAll('.black').length;
        if(!this.liveСell) {
            btnStarGame.classList.add('d-none');
            btnClearField.classList.add('d-none');
        } else {
            btnStarGame.classList.remove('d-none');
            btnClearField.classList.remove('d-none');
        }
    }

}