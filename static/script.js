document.addEventListener("DOMContentLoaded", () => {
    // Attempt to find the parent element by its class name
    const parentElement = document.querySelector('[class*="share"]'); // Matches any class containing "share"

    if (parentElement) {
        console.log('Parent element found:', parentElement);
        
        // Find the button within the parent
        const firstButton = parentElement.querySelector('button[data-automation-id="apply-button"]');
        
        if (firstButton) {
            console.log('Button found:', firstButton);
            firstButton.click(); // Emulate the button click
            console.log('Button clicked successfully.');
        } else {
            console.log('Button not found within the parent element.');
        }
    } else {
        console.log('Parent element not found. Trying direct button selection...');
        
        // Fallback to direct button selection
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        if (applyButton) {
            console.log('Direct button found:', applyButton);
            applyButton.click(); // Emulate a click
            console.log('Button clicked successfully via fallback.');
        } else {
            console.log('Direct button selection also failed.');
        }
    }
});
