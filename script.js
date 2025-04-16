let colorHistory = [];

// Function to generate random hex color code
function getRandomColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16); // Generate random hex code
    return "#" + hex.padStart(6, "0"); // Add padding if hex code is less than 6 digits
}

// Function to generate color palette and display it
function generateColors() {
    const colorPalette = document.getElementById("color-palette");
    colorPalette.innerHTML = ''; // Clear existing colors
    colorHistory = [];

    for (let i = 0; i < 5; i++) { // Generate 5 colors
        const color = getRandomColor(); // Generate a random color
        colorHistory.push(color); // Add color to history

        const colorBlock = document.createElement("div");
        colorBlock.classList.add("color-block");
        colorBlock.style.backgroundColor = color; // Set background color

        // Add color name on hover (just an example, you could use a color-naming library here)
        colorBlock.title = color;

        // Event listener to copy the color code when clicked
        colorBlock.addEventListener("click", () => {
            navigator.clipboard.writeText(color).then(() => {
                alert(`Copied: ${color}`); // Notify user that color has been copied
            });
        });

        colorPalette.appendChild(colorBlock);
    }
}

// Function to save the generated color palette in local storage
function savePalette() {
    localStorage.setItem('savedPalette', JSON.stringify(colorHistory));
    alert('Palette saved!');
}

// Function to download the palette as a .txt file
function downloadPalette() {
    const blob = new Blob([colorHistory.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'palette.txt';
    link.click();
}

function viewSavedPalette() {
    const saved = localStorage.getItem('savedPalette');
    if (!saved) {
        alert("No saved palette found!");
        return;
    }

    const savedColors = JSON.parse(saved); // Convert back to array
    const colorPalette = document.getElementById("color-palette");
    colorPalette.innerHTML = ''; // Clear current display

    savedColors.forEach(color => {
        const colorBlock = document.createElement("div");
        colorBlock.classList.add("color-block");
        colorBlock.style.backgroundColor = color;
        colorBlock.title = color;

        colorBlock.addEventListener("click", () => {
            navigator.clipboard.writeText(color).then(() => {
                alert(`Copied: ${color}`);
            });
        });

        colorPalette.appendChild(colorBlock);
    });
}


// Generate colors when the page loads
generateColors();
