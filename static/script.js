// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select the parent element
const parentElement = document.querySelector('.share');

// Check if the parent element exists
if (parentElement) {
    console.log('Parent element found. Attempting to find and click the button...');
    // Select the first child button
    const firstButton = parentElement.querySelector('button[data-automation-id="apply-button"]');
    
    if (firstButton) {
        firstButton.click(); // Emulate a click on the first child button
        console.log('Button clicked successfully.');
    } else {
        console.log('Button not found within the parent element.');
    }
} else {
    console.log('Parent element not found.');
}

});


