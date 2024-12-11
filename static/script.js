document.addEventListener("DOMContentLoaded", () => {
    const sendMessageToParent = () => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        if (appliedButton) {
            console.log('Applied button detected. Sending message to parent.');
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');
        }
    };

    // Monitor the apply button state on page load
    sendMessageToParent();

    // Create a MutationObserver to monitor the DOM for changes
    const observer = new MutationObserver(() => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        if (appliedButton) {
            console.log('Applied button detected after DOM change. Sending message to parent.');
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');
            observer.disconnect(); // Stop observing once applied button is detected
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Attach a listener to the form submission button, if it exists
    const formSubmitButton = document.querySelector('button[data-automation-id="apply-modal-save"]');
    if (formSubmitButton) {
        formSubmitButton.addEventListener('click', () => {
            console.log('Form submission button clicked. Waiting for apply button state to update...');

            // Check the apply button state after a delay to account for asynchronous updates
            setTimeout(() => {
                sendMessageToParent();
            }, 3000); // Adjust the delay time as needed
        });
    }
});
