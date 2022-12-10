const container = document.querySelector('.container');
const colorButtons = document.querySelectorAll('.color-choice');
const colorPicker = document.querySelector('#input-color');
const pixelSize = document.querySelector('#sizerange');
const clearAll = document.querySelector('.clear');
const pixelSizeNum = document.querySelector('#pixel-size')
var color = 'black';

function createGrid(gridNumber) {
    let gridArea = gridNumber * gridNumber;
    for(let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
        container.insertAdjacentElement('beforeend', gridItem);
    }
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid))
}

function colorGrid() {
    switch(color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('grey');
            break;
        case 'grey':
            if(this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0,0,0, ${currentOpacity + 0.1})`;
                    this.classList.add('grey');
                }
            }else if(this.classList == 'grey' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
            break;
                
        case 'black':
            this.style.backgroundColor = `#000000`;
            this.classList.remove('grey');
            break;
        case 'erase':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('grey');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('grey');
            break;
    }
}
function changeColor(e) {
    switch(e.target.dataset.color) {
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'grey':
            color = 'grey';
            break;
        case 'erase':
            color = 'erase';
            break;
        case 'black':
            color = 'black';
            break;
    }
}

function buttonHover() {
    this.style.border = '1px solid #000000';
}

function buttonStandard() {
    this.style.border = '1px solid #ffffff';
}

createGrid(10);

function handleColorSelection(e) {
    color = e.target.value;
}

function changePixelSize() {
    console.log(this.value)
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
    createGrid(this.value);
    pixelSizeNum.textContent = `Pixel Size ${this.value}`;
}

function handleClearAll() {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff');
}


colorButtons.forEach(colorButton => colorButton.addEventListener('click', changeColor));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseover', buttonHover));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseout', buttonStandard));
colorPicker.addEventListener('change', handleColorSelection, false);
colorPicker.addEventListener('input', handleColorSelection, false);
pixelSize.addEventListener('mouseup', changePixelSize);
clearAll.addEventListener('click', handleClearAll);

