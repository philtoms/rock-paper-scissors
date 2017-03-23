export const actions = {
    SHOW_RULES: 'rps/SHOW_RULES',
    HIDE_RULES: 'rps/HIDE_RULES',
    DEMO: 'rps/DEMO',
    START: 'rps/START',
    RUN: 'rps/RUN',
    STRIKE: 'rps/STRIKE',
    END: 'rps/END',
    RESULT: 'rps/RESULT'
};

const keyMap = {
    R: actions.SHOW_RULES,
    D: actions.DEMO,
    S: actions.START,
    B: actions.STRIKE,
    N: actions.STRIKE,
    M: actions.STRIKE
};

const valueMap = {
    B: 'rock',
    N: 'paper',
    M: 'scissors'
};

// pseudo generator - panic (er temp) code after failing to add generators to this babel setup :(
// TODO: upgrade babel to support transparent babel-regenerator-runtime
const generator = yieldCB => event => {
    const keyName = (event.key || '').toUpperCase();
    // a matching action
    if (Object.keys(keyMap).includes(keyName)) {
        yieldCB ({type: keyMap[keyName], value: valueMap[keyName]});
    }
};

export default handle => ({
    forEach: cb => handle(generator(cb))
});
