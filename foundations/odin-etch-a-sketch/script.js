/* 
    TASKS

    #1
    construct a 16 by 16 grid of divs in the grid-container (generatively)
    #2
    when prompt-btn pressed, prompt user for size




*/

const grid = document.querySelector('.grid-container');

for (let i = 0; i < 16; i++){
    const row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j = 0; j < 16; j++){
        const square = document.createElement('div');
        square.classList.add('grid-square');
        row.appendChild(square);
    }
    grid.appendChild(row);
}
