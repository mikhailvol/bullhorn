document.addEventListener("DOMContentLoaded", () => {
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

            // Send a postMessage to the parent window to notify that the button is applied
            window.parent.postMessage({ status: 'applied', message: 'The button has been applied.' }, '*');

            observer.disconnect(); // Stop observing after notification
        }

        // Track the div with _ngcontent-serverapp-c98 attribute
        const targetDiv = document.querySelector('div[_ngcontent-serverapp-c98=""]');
        if (targetDiv) {
            const toastObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === 1 && node.matches('novo-toast.growTopRight.launched.success.toast-container.show.animate')) {
                                console.log('Success toast detected:', node);
                                // Send a postMessage to the parent window
                                window.parent.postMessage({ status: 'applied', message: 'Success toast displayed.' }, '*');
                                toastObserver.disconnect(); // Stop observing after detecting the toast
                            }
                        });
                    }
                });
            });

            toastObserver.observe(targetDiv, { childList: true, subtree: true });
        }
    });

    // Start observing the document body for child nodes (e.g., the button and div)
    observer.observe(document.body, { childList: true, subtree: true });
});
