document.addEventListener("DOMContentLoaded", () => {
    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const targetDiv = document.querySelector('div[_ngcontent-serverapp-c98]');

        // Check for apply button and click it
        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
        }

        // Check for applied button
        if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');
            observer.disconnect(); // Stop observing after notification
        }

        // Monitor the target div for the addition of <novo-toast>
        if (targetDiv && targetDiv.querySelector('novo-toast')) {
            console.log('<novo-toast> element detected inside target div.');
            window.parent.postMessage({ status: 'toast-detected', message: '<novo-toast> element added.' }, '*');
            observer.disconnect(); // Stop observing after toast detection
        }
    });

    // Start observing the document body for child nodes (e.g., the button and target div changes)
    observer.observe(document.body, { childList: true, subtree: true });

    // Secondary observer for tracking if the apply button is not applied
    const noApplyObserver = new MutationObserver(() => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');

        if (!appliedButton) {
            console.log('Applied button not found.');
            window.parent.postMessage({ status: 'not-applied', message: 'The button is not applied.' }, '*');
        }
    });

    // Start observing for cases where the button is not applied
    noApplyObserver.observe(document.body, { childList: true, subtree: true });
});
