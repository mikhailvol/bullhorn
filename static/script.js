document.addEventListener("DOMContentLoaded", () => {
    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const formSubmitButton = document.querySelector('button[data-automation-id="apply-modal-save"]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
            observer.disconnect(); // Stop observing after clicking
        } else if (appliedButton) {
            console.log('Applied button found:', appliedButton);

            // Send a postMessage to the parent window to notify that the button is applied
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');

            observer.disconnect(); // Stop observing after notification
        }

        if (formSubmitButton) {
            formSubmitButton.addEventListener('click', () => {
                console.log('Form submit button clicked. Monitoring status...');

                // Recheck applied button status after form submission
                const checkAppliedButton = () => {
                    const reappliedButton = document.querySelector('button[data-automation-id="applied-button"]');
                    if (reappliedButton) {
                        console.log('Applied button confirmed after form submission.');
                        window.parent.postMessage({ status: 'applied', message: 'Form submitted successfully, and button remains applied.' }, '*');
                        clearInterval(checkInterval);
                    }
                };

                // Poll for status after form submission
                const checkInterval = setInterval(checkAppliedButton, 1000);

                setTimeout(() => {
                    clearInterval(checkInterval);
                    console.log('Stopped checking for applied button after timeout.');
                }, 10000); // Stop checking after 10 seconds
            });
        }
    });

    // Start observing the document body for child nodes (e.g., the button)
    observer.observe(document.body, { childList: true, subtree: true });
});
