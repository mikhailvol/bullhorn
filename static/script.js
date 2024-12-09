// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons on the page
    const buttons = document.querySelectorAll('button');

    // Iterate over all buttons
    buttons.forEach(button => {
        // Add a click event listener to each button
        button.addEventListener('click', () => {
            console.log('Button clicked:', button);

            // Simulate a click on the button
            button.click();
        });
    });
});


