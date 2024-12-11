document.addEventListener("DOMContentLoaded", () => {
    // Function to send a message to the parent window
    const sendMessageToParent = (status, message) => {
        window.parent.postMessage({ status, message }, '*');
    };

    // Monitor the apply button
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const formButton = document.querySelector('button[data-automation-id="apply-modal-save"]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
        } else if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            sendMessageToParent('applied', 'The button is applied.');
        }

        // Monitor form submission
        if (formButton) {
            const formObserver = new MutationObserver(() => {
                if (!formButton.hasAttribute('disabled')) {
                    // Form submission succeeded if apply button stays applied
                    const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
                    if (appliedButton) {
                        console.log('Form submission succeeded.');
                        sendMessageToParent('applied', 'Form submitted successfully and button is applied.');
                    } else {
                        console.log('Form submission failed.');
                        sendMessageToParent('error', 'Form submission failed.');
                    }
                    formObserver.disconnect(); // Stop observing
                }
            });

            formObserver.observe(formButton, { attributes: true, attributeFilter: ['disabled'] });
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
});
