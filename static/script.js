document.addEventListener("DOMContentLoaded", () => {
    const notifyAppliedStatus = () => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        if (appliedButton) {
            console.log('Applied button found:', appliedButton);

            // Send a postMessage to the parent window to notify that the button is applied
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
            notifyAppliedStatus();
            observer.disconnect(); // Stop observing after notification
        }
    });

    // Start observing the document body for child nodes (e.g., the button)
    observer.observe(document.body, { childList: true, subtree: true });

    // Check if the apply button is already applied on page load
    notifyAppliedStatus();

    // Monitor form submission
    const formSubmitButton = document.querySelector('button[data-automation-id="apply-modal-save"]');
    if (formSubmitButton) {
        formSubmitButton.addEventListener('click', () => {
            console.log('Form submit button clicked. Monitoring for applied status.');

            // Recheck applied button status after a delay to allow form submission processing
            setTimeout(notifyAppliedStatus, 3000);
        });
    }
});
