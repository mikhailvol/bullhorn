document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const targetContainer = document.querySelector('.job-container');

        // Debugging logs
        console.log('Apply Button:', applyButton);
        console.log('Target Container:', targetContainer);

        if (applyButton && targetContainer) {
            observer.disconnect(); // Stop observing once elements are found

            applyButton.addEventListener('click', () => {
                console.log('Apply button clicked!');

                const modalObserver = new MutationObserver(() => {
                    const modalContainer = document.querySelector('novo-modal-container');
                    if (modalContainer) {
                        modalObserver.disconnect(); // Stop observing once modal is found
                        
                        // Move modal content to the target container
                        targetContainer.appendChild(modalContainer);

                        // Adjust modal styles
                        modalContainer.style.position = 'static';
                        modalContainer.style.zIndex = 'auto';
                        modalContainer.style.margin = '20px 0';

                        // Hide the overlay (if exists)
                        const overlay = document.querySelector('.modal-overlay');
                        if (overlay) {
                            overlay.style.display = 'none';
                        }

                        console.log('Modal content embedded successfully.');
                    }
                });

                // Observe the body for modal changes
                modalObserver.observe(document.body, { childList: true, subtree: true });
            });
        }
    });

    // Start observing for the presence of the "Apply Now" button and job container
    observer.observe(document.body, { childList: true, subtree: true });
});
