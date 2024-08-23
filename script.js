function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColors() {
    const colorCount = parseInt(document.getElementById('colorCount').value);
    const palette = document.getElementById('palette');
    palette.innerHTML = '';  // Clear previous colors

    for (let i = 0; i < colorCount; i++) {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = generateRandomColor();
        palette.appendChild(colorDiv);
    }
}

document.getElementById('generate').addEventListener('click', setRandomColors);

// Initialize with a random palette on page load
setRandomColors();
