const container = document.querySelector("#container");
const btn = document.querySelector("#resize-btn")

let isDrawing = false;

document.body.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.body.addEventListener("mouseup", () => {
    isDrawing = false;
})



function createGrid(size){
    container.innerHTML = "";

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        const square = document.createElement("div");
        square.classList.add("square");

        square.addEventListener("mouseenter", () => {
            if(isDrawing){
                square.classList.add("hover");
            }
        });

        container.appendChild(square);
    }
}

createGrid(16);

btn.addEventListener("click", () => {
    let numberOfSquares = Number(prompt("Enter the number of squares per side(max 100): "));
    if(!numberOfSquares || numberOfSquares < 1 || numberOfSquares > 100){
        alert("Please enter a number between 1 and 100");
        return;
    }

    createGrid(numberOfSquares);
});