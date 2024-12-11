document.addEventListener("DOMContentLoaded", () => {
    // Create a flag to prevent repeated actions
    let buttonActionHandled = false;
    let novoToastHandled = false;

    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(() => {
        if (buttonActionHandled) return; // Exit if the button action is already handled

        const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        const appliedButton = document.querySelector('button[data-automation-id="applied-button"]');
        const targetDiv = document.querySelector('div[_ngcontent-serverapp-c98]');

        if (applyButton) {
            console.log('Apply button found:', applyButton);
            applyButton.click(); // Emulate the click
            console.log('Apply button clicked successfully.');
            window.parent.postMessage({ status: 'clicked', message: 'The apply button was clicked.' }, '*');
            buttonActionHandled = true;
        } else if (appliedButton) {
            console.log('Applied button found:', appliedButton);
            window.parent.postMessage({ status: 'applied', message: 'The button is already applied.' }, '*');
            buttonActionHandled = true;
        }

        if (targetDiv && !novoToastHandled) {
            const divObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes) {
                        mutation.addedNodes.forEach((node) => {
                            if (node.tagName === 'NOVO-TOAST') {
                                console.log('Novo-toast element added:', node);
                                window.parent.postMessage({ status: 'applied', message: 'Novo-toast element was added.' }, '*');
                                novoToastHandled = true;
                                divObserver.disconnect(); // Stop observing after the element is added
                            }
                        });
                    }
                });
            });

            // Observe the target div for child additions
            divObserver.observe(targetDiv, { childList: true });
        }
    });

    // Start observing the document body for child nodes (e.g., the button or target div)
    observer.observe(document.body, { childList: true, subtree: true });
});
