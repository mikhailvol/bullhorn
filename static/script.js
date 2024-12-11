document.addEventListener("DOMContentLoaded", () => {
    // Function to send message to parent page
    const sendMessageToParent = (status, message) => {
        window.parent.postMessage({ status, message }, '*');
    };

    // Monitor changes in the DOM for the apply button
    const observer = new MutationObserver(() => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        if (appliedButton) {
            console.log('Applied button detected after loading.');
            sendMessageToParent('applied', 'The button is applied after page load.');
            observer.disconnect(); // Stop observing after the button is applied
        }
    });

    // Observe the document for button state changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Monitor form submission
    const form = document.querySelector('form.novo-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            const applyButton = document.querySelector('button[data-automation-id="apply-modal-save"]');
            const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
            
            // Check if the button is in a "loading" state
            const isLoading = applyButton?.getAttribute('loading') === 'true';
            
            if (isLoading) {
                console.log('Form submission started.');
                sendMessageToParent('submitting', 'Form submission is in progress.');
            }

            setTimeout(() => {
                if (appliedButton) {
                    console.log('Applied button detected after form submission.');
                    sendMessageToParent('applied', 'The button is applied after form submission.');
                } else {
                    console.log('Form submission failed or button not applied.');
                    sendMessageToParent('failed', 'Form submission failed or button not applied.');
                }
            }, 2000); // Adjust timeout as needed to allow time for form processing
        });
    }
});
