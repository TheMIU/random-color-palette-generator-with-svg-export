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
        const colorHex = generateRandomColor();

        colorDiv.className = 'color d-flex justify-content-center align-items-center';
        colorDiv.style.backgroundColor = colorHex;
        colorDiv.style.position = 'relative';
        colorDiv.style.width = '100px';
        colorDiv.style.height = '100px';
        colorDiv.style.margin = '0 5px';
        colorDiv.style.borderRadius = '5px';
        colorDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        const hexCodeText = document.createElement('span');
        hexCodeText.style.color = 'white'; // Adjust text color for readability
        hexCodeText.style.fontWeight = 'bold';
        hexCodeText.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.5)';
        hexCodeText.innerText = colorHex;

        colorDiv.appendChild(hexCodeText);
        palette.appendChild(colorDiv);
    }
}

function exportPaletteAsSVG() {
    const colors = document.querySelectorAll('.color');
    const svgWidth = 100 * colors.length; // Width based on number of colors
    const svgHeight = 100; // Fixed height

    // Start constructing the SVG content
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" font-family="Arial" font-size="12" text-anchor="middle">`;

    colors.forEach((colorDiv, index) => {
        const color = colorDiv.style.backgroundColor;
        const hexCode = colorDiv.querySelector('span').innerText;

        // Add the color rectangle
        svgContent += `<rect x="${index * 100}" y="0" width="100" height="100" fill="${color}" />`;

        // Add the hex code in the center of the rectangle
        svgContent += `<text x="${index * 100 + 50}" y="55" fill="white">${hexCode}</text>`;
    });

    svgContent += '</svg>';

    // Create a blob and download the SVG file
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette_with_hex_codes.svg';
    a.click();
    URL.revokeObjectURL(url); // Clean up the URL object
}


document.getElementById('generate').addEventListener('click', setRandomColors);
document.getElementById('export').addEventListener('click', exportPaletteAsSVG);

// Initialize with a random palette on page load
setRandomColors();



/////////////////////////
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.style.backgroundColor === 'black';
    const darkIcon = document.getElementById('darkIcon');

    // Toggle background color and icon
    if (isDarkMode) {
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        darkIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        darkIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Event listener for the dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
