document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const formButton = document.querySelector('button[data-automation-id="apply-modal-save"]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click();
            console.log('Apply button clicked successfully.');
        }

        if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            sendMessageToParent({ status: 'applied', message: 'The button is in applied state.' });
        }

        if (formButton) {
            formButton.addEventListener("click", () => {
                console.log('Form submit button clicked.');
                const checkSubmission = setInterval(() => {
                    if (appliedButton) {
                        sendMessageToParent({ status: 'applied', message: 'Form submission succeeded, button is applied.' });
                        clearInterval(checkSubmission);
                    }
                }, 500);
            });
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Function to send messages to the parent window
    function sendMessageToParent(data) {
        window.parent.postMessage(data, '*');
    }
});
