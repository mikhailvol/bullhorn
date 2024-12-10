// document.addEventListener("DOMContentLoaded", () => {
//     // Create a MutationObserver to monitor changes in the DOM
//     const observer = new MutationObserver(() => {
//         const applyButton = document.querySelector('button[data-automation-id="apply-button"]');
        
//         if (applyButton) {
//             console.log('Button found:', applyButton);
//             applyButton.click(); // Emulate the click
//             console.log('Button clicked successfully.');
//             observer.disconnect(); // Stop observing after clicking
//         }
//     });

//     // Start observing the document body for child nodes (e.g., the button)
//     observer.observe(document.body, { childList: true, subtree: true });
// });
