document.addEventListener('DOMContentLoaded', () => {
    // Find the button using its `data-automation-id` attribute
    const button = document.querySelector('button[data-automation-id="apply-button"]');
    console.log("123");
    // Check if the button exists
    if (button) {
        console.log('Button found:', button);

        // Log when the button is clicked
        button.addEventListener('click', () => {
            console.log('Button was clicked!');
        });

        // Emulate a click on the button and log it
        console.log('Triggering button click...');
        button.click();
    } else {
        console.error('Button not found!');
    }
});

