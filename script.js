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

function exportPaletteAsSVG() {
    const colors = document.querySelectorAll('.color');
    const svgWidth = 100 * colors.length; // Width based on number of colors
    const svgHeight = 100; // Fixed height

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
    
    colors.forEach((colorDiv, index) => {
        const color = colorDiv.style.backgroundColor;
        svgContent += `<rect x="${index * 100}" y="0" width="100" height="100" fill="${color}" />`;
    });
    
    svgContent += '</svg>';
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.svg';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
}

document.getElementById('generate').addEventListener('click', setRandomColors);
document.getElementById('export').addEventListener('click', exportPaletteAsSVG);

// Initialize with a random palette on page load
setRandomColors();
