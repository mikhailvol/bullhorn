document.addEventListener("DOMContentLoaded", () => {
    // Select the "Apply Now" button
    const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
    const targetContainer = document.querySelector('.job-container');

    // Debugging logs
    console.log('Apply Button:', applyButton);
    console.log('Target Container:', targetContainer);

    // Check if both elements exist
    if (applyButton && targetContainer) {
        applyButton.addEventListener('click', () => {
            console.log('Apply button clicked!'); // Debugging

            // Wait for the modal to be added to the DOM
            const observer = new MutationObserver(() => {
                const modalContainer = document.querySelector('novo-modal-container');
                if (modalContainer) {
                    observer.disconnect(); // Stop observing after modal is found
                    
                    // Move modal content to the target container
                    targetContainer.appendChild(modalContainer);

                    // Adjust modal styles to remove absolute positioning
                    modalContainer.style.position = 'static';
                    modalContainer.style.zIndex = 'auto';
                    modalContainer.style.margin = '20px 0';

                    // Ensure the overlay is hidden (if exists)
                    const overlay = document.querySelector('.modal-overlay');
                    if (overlay) {
                        overlay.style.display = 'none';
                    }

                    console.log('Modal content embedded successfully.');
                }
            });

            // Observe DOM changes to find when the modal is added
            observer.observe(document.body, { childList: true, subtree: true });
        });
    } else {
        console.error('Required elements not found: Apply button or target container.');
    }
});

