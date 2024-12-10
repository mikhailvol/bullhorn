// Listen for messages from the parent page
window.addEventListener('message', (event) => {
    // Validate the origin of the message (replace with the parent domain for better security)
    if (event.origin !== 'https://your-parent-domain.com') {
        return; // Ignore messages from unknown origins
    }

    const { action } = event.data;

    if (action === 'initializeOverlay') {
        // Create and style the overlay
        const overlay = document.createElement('div');
        overlay.id = 'custom-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'none';
        overlay.style.zIndex = '9999';

        // Append the overlay to the iframe document
        document.body.appendChild(overlay);
    } else if (action === 'showOverlay') {
        // Display the overlay when the apply button is clicked
        const overlay = document.getElementById('custom-overlay');
        if (overlay) {
            overlay.style.display = 'block';
        }
    }
});
