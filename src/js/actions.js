const keyMap = {
    H: 'rps/HELP',
    D: 'rps/DEMO',
    R: 'rps/RULES',
    S: 'rps/START'
};

// pseudo generator - panic (er temp) code after failing to add generators to this babel setup :(
// TODO: upgrade babel to support transparent babel-regenerator-runtime
const generator = yieldCB => event => {
    const keyName = (event.key || '').toUpperCase();
    console.log(event);
    // a matching action
    if (Object.keys(keyMap).includes(keyName)) {
        yieldCB ({type: keyMap[keyName]});
    }
};

export default handle => ({
    forEach: cb => handle(generator(cb))
});
