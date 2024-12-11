document.addEventListener("DOMContentLoaded", () => {
    const sendMessageToParent = () => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        if (appliedButton) {
            console.log('Applied button detected on page load or form submission.');
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');
        }
    };

    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
            observer.disconnect(); // Stop observing after clicking
        } else if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');
            observer.disconnect(); // Stop observing after notification
        }
    });

    // Start observing the document body for child nodes (e.g., the button)
    observer.observe(document.body, { childList: true, subtree: true });

    // Check button state on page load
    sendMessageToParent();

    // Attach event listener for form submission
    const formSubmitButton = document.querySelector('button[data-automation-id="apply-modal-save"]');
    if (formSubmitButton) {
        formSubmitButton.addEventListener('click', () => {
            console.log('Form submission detected. Waiting for button state to update...');

            // Use a short delay to check for the applied button state after submission
            setTimeout(() => {
                sendMessageToParent();
            }, 3000); // Adjust delay time if necessary
        });
    }
});
