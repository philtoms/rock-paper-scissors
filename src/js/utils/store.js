// Store - simplified 'redux' pattern.
// Limitations - single reduce function.

// private
let _state;
let _reduce;
const _subscribers = [];

export default class Store {
    constructor(state, reducer) {
        // No fancy map / reduce (yet)..
        _reduce = reducer;
        _state = _reduce({...state}, 'store/INIT');
    }

    dispatch(action) {
        const nextState = _reduce(_state, action);
        if (nextState !== _state) {
            _state = nextState;
            _subscribers.forEach(cb => cb(_state));
        }
    }

    getState() {
        return _state;
    }

    subscribe(cb) {
        _subscribers.push(cb);
    }
}
