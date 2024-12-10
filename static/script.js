// Listen for messages from the parent page
window.addEventListener('message', (event) => {
    // Validate the origin of the message
    if (event.origin !== 'https://nxtpro.webflow.io') {
        return; // Ignore messages from unknown origins
    }

    if (event.data.action === 'findAndClickButton') {
        const observer = new MutationObserver(() => {
            const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
            
            if (applyButton) {
                console.log('Button found:', applyButton);
                applyButton.click(); // Emulate the click
                console.log('Button clicked successfully.');
                observer.disconnect(); // Stop observing after clicking
            }
        });

        // Start observing the document body for child nodes (e.g., the button)
        observer.observe(document.body, { childList: true, subtree: true });
    }
});

