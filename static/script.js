window.addEventListener('message', (event) => {
    if (event.data.action === 'observeAndOverlay') {
        const observer = new MutationObserver(() => {
            const modalContainer = document.querySelector('novo-modal-container');

            if (modalContainer && !document.querySelector('.modal-overlay')) {
                console.log('Modal detected, adding overlay.');

                // Create the overlay element
                const overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                overlay.style.zIndex = '999'; // Ensure it appears above other elements

                // Add overlay to the body
                document.body.appendChild(overlay);

                // Remove overlay when modal is closed
                const closeButton = modalContainer.querySelector('button[icon="bhi-times"]');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        console.log('Modal closed, removing overlaay.');
                        overlay.remove();
                    });
                }

                observer.disconnect(); // Stop observing after overlay is added
            }
        });

        // Start observing the body for modal container visibility
        observer.observe(document.body, { childList: true, subtree: true });
    }
});
