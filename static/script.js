document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');

        if (appliedButton) {
            console.log('Applied button detected after page load.');
            window.parent.postMessage({ status: 'applied', message: 'Button is applied on page load.' }, '*');
            observer.disconnect(); // Stop observing further changes
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Monitor form submission events
    const form = document.querySelector('form.novo-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission
            console.log('Form submitted.');

            // Wait for potential success state
            setTimeout(() => {
                const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
                if (appliedButton) {
                    console.log('Applied button detected after form submission.');
                    window.parent.postMessage({ status: 'applied', message: 'Button is applied after form submission.' }, '*');
                } else {
                    console.log('Form submission failed or button not applied.');
                    window.parent.postMessage({ status: 'not-applied', message: 'Form submission failed or button not applied.' }, '*');
                }
            }, 1000); // Delay to account for state changes
        });
    }
});
