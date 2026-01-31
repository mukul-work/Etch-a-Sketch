const container = document.querySelector("#container");
const colorPicker = document.querySelector("#color-picker");
const rainbowButton = document.querySelector("#rainbow-btn");
const clearGrid = document.querySelector("#clear-grid");
const sizeSlider = document.querySelector("#slider");
const sizeValue = document.querySelector("#sizeValue");

let rainbowMode = false;
let currentColor = colorPicker.value;
let isDrawing = false;
let currentSize = 16;

function changeCurrentSize(newSize){
    currentSize = newSize;
} 

clearGrid.addEventListener("click", () => {
    container.innerHTML = '';
    createGrid(currentSize);
})

document.body.addEventListener("mousedown", () => {
    isDrawing = true;
});

document.body.addEventListener("mouseup", () => {
    isDrawing = false;
})

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
})

rainbowButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    rainbowButton.textContent = rainbowMode ? "Normal Mode" : "Rainbow Mode";
    colorPicker.style.display = rainbowMode ? "none" : "inline-block";
})

function getRandomRGB(){
    return{
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
}

function hexToRGB(currentColor){
    const value = currentColor.replace("#", "");
    return{
        r: parseInt(value.slice(0,2), 16),
        g: parseInt(value.slice(2,4), 16),
        b: parseInt(value.slice(4,6), 16)
    }
}

function darkenSquare(square){
    let darkness = Number(square.dataset.darkness);

    if(darkness < 10){
        darkness += 1;
        square.dataset.darkness = darkness;
    }

    const alpha = darkness / 10;

    if(rainbowMode){
        const { r, g, b } = getRandomRGB();
        square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    else{
        const { r, g, b } = hexToRGB(currentColor);
        square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

}

function createGrid(size){
    container.innerHTML = "";

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++){
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.darkness = 0;

        square.addEventListener("mouseover", () => {
            if(isDrawing){
                darkenSquare(square);
            }
        });

        square.addEventListener("mousedown", () => {
            if(isDrawing){
                darkenSquare(square);
            }
        });

        container.appendChild(square);
    }
}

createGrid(currentSize);

function changeSizeValue(size){
    sizeValue.innerHTML = `${size} x ${size}`;
}

sizeSlider.onmousemove = (e) => {
    changeSizeValue(e.target.value);
}

sizeSlider.onchange = (e) => {
    changeCurrentSize(e.target.value);
    createGrid(currentSize);
}