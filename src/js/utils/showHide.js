export default selector => {
    const elem = document.querySelector(`.${selector}`);
    const modifier = `${selector}--show`;

    return show => {
        elem.classList[show ? 'add' : 'remove'](modifier);
    }
}
