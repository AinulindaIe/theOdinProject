/* 
    TASKS

    #1
    construct a 16 by 16 grid of divs in the grid-container (generatively)
    #2
    when prompt-btn pressed, prompt user for size




*/
const GRIDWINDOW_SIZE = 720;
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
function setBrush(brushFunction){
    const gridSquares = Array.from(document.querySelectorAll('.grid-square'));
    gridSquares.forEach(square => square.addEventListener('mouseenter', brushFunction));
}

function deselectBrush(brushFunction){
    const gridSquares = Array.from(document.querySelectorAll('.grid-square'));
    gridSquares.forEach(square => square.removeEventListener('mouseenter', brushFunction));
}

// BRUSHES
function binaryBrush(e) {
    this.style.cssText += "background-color: black;";
}


//Select grid interaction with user
function selectGrid(e) {
    const size = prompt("Choose grid-size (1-100)");
    removeGrid();
    newGrid(size);
    setBrush(currentBrush);
}
// Initial configuration
newGrid(16);
let currentBrush = binaryBrush;
setBrush(currentBrush);

const promptBtn = document.querySelector('.prompt-btn');
promptBtn.addEventListener('click', selectGrid);