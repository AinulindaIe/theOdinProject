/* 
    TASKS

    #1
    construct a 16 by 16 grid of divs in the grid-container (generatively)
    #2
    when prompt-btn pressed, prompt user for size




*/
const GRIDWINDOW_SIZE = 720;
const COLORS = ['#A0E4CB', '#59C1BD', '#0D4C92']
// GRID setup
function newGrid(units){
    const grid = document.querySelector('.grid-container');
    const side = Math.floor((GRIDWINDOW_SIZE / units));

    if (units > 0 && units < 101){

        for (let i = 0; i < units; i++){
            const row = document.createElement('div');
            row.classList.add('grid-row');
            row.style.cssText += `heigth: ${side}px`

            for (let j = 0; j < units; j++){
                const square = document.createElement('div');
                square.classList.add('grid-square');
                square.style.cssText += `width: ${side}px; height: ${side}px;`
                square.style.opacity = 0;
                row.appendChild(square);
            }
            
            grid.appendChild(row);
        }
    }else{
        console.warn(`Illegal grid-size: ${units}, 1-100 allowed`);
    }
}

function removeGrid() {
    const grid = document.querySelector('.grid-container');
    // Solution from stackOverflow by Gabriel McAdams
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

// Change brush-stroke
function setBrush(brushFunction, eventKey){
    const gridSquares = Array.from(document.querySelectorAll('.grid-square'));
    gridSquares.forEach(square => square.addEventListener(eventKey, brushFunction));
}

function deselectBrush(brushFunction, eventKey){
    const gridSquares = Array.from(document.querySelectorAll('.grid-square'));
    
    if (brushFunction === transitionBrush) {
        gridSquares.forEach(square => square.classList.remove('.transition-square'));
    }
    gridSquares.forEach(square => square.removeEventListener(eventKey, brushFunction));
}

// BRUSHES
function binaryBrush(e) {
    this.style.opacity = 1;
}

function slowShadingBrush(e) {
    const opacity = ((parseFloat(this.style.opacity) + 0.1) * 10) / 10;
    
    if (opacity < 1.1) {
        this.style.opacity = opacity
    }
}

function colorBrush(e) {
     this.style.backgroundColor = COLORS[Math.floor(Math.random() * 3)];
}


// BRUSH setup

function enableBinaryBrush() {
    deselectBrush(currentBrush, currentEventKey);
    setBrush(binaryBrush, 'mouseenter');
    currentBrush = binaryBrush;
    currentEventKey = 'mouseenter';
}

function enableShadingBrush() {
    deselectBrush(currentBrush, currentEventKey);
    setBrush(slowShadingBrush, 'mouseenter');
    currentBrush = slowShadingBrush;
    currentEventKey = 'mouseenter';

}

function enableColorBrush() {
    deselectBrush(currentBrush, currentEventKey);
    setBrush(colorBrush, 'mouseenter');
    currentBrush = colorBrush;
    currentEventKey = 'mouseenter';
}


//Select grid interaction with user
function selectGrid(e) {
    const size = prompt("Choose grid-size (1-100)");
    removeGrid();
    newGrid(size);
    setBrush(currentBrush, 'mouseenter');
}
// Initial configuration
newGrid(16);
let currentBrush = binaryBrush;
let currentEventKey = 'mouseenter'
setBrush(currentBrush, currentEventKey);

const promptBtn = document.querySelector('.prompt-btn');
promptBtn.addEventListener('click', selectGrid);

const binaryBrushBtn = document.querySelector('.binary');
binaryBrushBtn.addEventListener('click', enableBinaryBrush);

const shadeBrushBtn = document.querySelector('.shading');
shadeBrushBtn.addEventListener('click', enableShadingBrush);

const colorBrushBtn = document.querySelector('.color');
colorBrushBtn.addEventListener('click', enableColorBrush);

