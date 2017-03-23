// Helper function to toggle the visibility of an element
export default selector => {
    const elem = document.querySelector(`.${selector}`);
    const modifier = `${selector}--show`;

    return show => {
        elem.classList[show ? 'add' : 'remove'](modifier);

        // make the visible element available to the caller
        return show && elem;
    }
}
