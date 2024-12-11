document.addEventListener("DOMContentLoaded", () => {
    // Send a postMessage when the page loads and button is already applied
    const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
    if (appliedButton) {
        window.parent.postMessage({ status: 'applied', message: 'Button is applied on page load.' }, '*');
    }

    // Monitor changes to the DOM for button updates
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.addEventListener('click', () => {
                console.log('Apply button clicked.');
            });
        } else if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            window.parent.postMessage({ status: 'applied', message: 'Button state changed to applied.' }, '*');
            observer.disconnect(); // Stop observing after state change
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Monitor the form submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', () => {
            const checkLoadingInterval = setInterval(() => {
                const formButton = document.querySelector('button[data-automation-id="apply-modal-save"]');
                if (formButton && formButton.getAttribute('loading') === 'false') {
                    clearInterval(checkLoadingInterval);
                    const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
                    if (appliedButton) {
                        window.parent.postMessage({ status: 'applied', message: 'Form submitted successfully, button is applied.' }, '*');
                    }
                }
            }, 500);
        });
    }
});
