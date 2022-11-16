/* 
    TASKS

    #1
    construct a 16 by 16 grid of divs in the grid-container (generatively)
    #2
    when prompt-btn pressed, prompt user for size




*/

// GRID setup
function newGrid(units){
    const grid = document.querySelector('.grid-container');

    if (units > 0 && units < 101){
        for (let i = 0; i < units; i++){
            const row = document.createElement('div');
            row.classList.add('grid-row');
            for (let j = 0; j < units; j++){
                const square = document.createElement('div');
                square.classList.add('grid-square');
                row.appendChild(square);
            }
            grid.appendChild(row);
        }
    }else{
        console.warn(`Illegal grid-size: ${units}, 0-100 allowed`);
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
    this.style.cssText = "background-color: black;";
}

// Initial configuration
newGrid(16);
let currentBrush = binaryBrush;
setBrush(currentBrush);
