document.addEventListener('DOMContentLoaded', () => {
   // Wrap in page load
window.addEventListener('load', () => {
    // Log all buttons on the page
    const allButtons = document.querySelectorAll('button');
    console.log("All buttons found on the page:", allButtons);

    // Find the specific button using its `data-automation-id`
    const button = document.querySelector('button[data-automation-id="apply-button"]');

    // Check if the button exists
    if (button) {
        console.log("Specific button found:", button);

        // Attach an event listener to log when the button is clicked
        button.addEventListener('click', () => {
            console.log("The specific button was clicked!");
        });

        // Emulate a click to demonstrate functionality
        console.log("Emulating a click on the button...");
        button.click();
    } else {
        console.log("The specific button was not found.");
    }
});

});

