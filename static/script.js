document.addEventListener("DOMContentLoaded", () => {
    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const targetDiv = document.querySelector('div[_ngcontent-serverapp-c98]');

        // Check for the apply button and click it
        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
            observer.disconnect(); // Stop observing after clicking
        } 
        // Check for the applied button and send a message
        else if (appliedButton) {
            console.log('Applied button found:', appliedButton);

            // Send a postMessage to the parent window to notify that the button is applied
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');

            observer.disconnect(); // Stop observing after notification
        }

        // Check for the target div and if the specific novo-toast element is added
        if (targetDiv && targetDiv.querySelector('novo-toast.growTopRight.launched.success.toast-container.show.animate')) {
            console.log('Novo-toast element added to the target div');

            // Send a postMessage to the parent window
            window.parent.postMessage({ status: 'toast-added', message: 'Novo-toast element detected.' }, '*');

            observer.disconnect(); // Stop observing after the toast is detected
        }
    });

    // Start observing the document body for child nodes (e.g., the button or toast addition)
    observer.observe(document.body, { childList: true, subtree: true });
});
