// Store - simplified 'redux' pattern.
// Limitations - single reduce function.

// private
let _state;
let _reduce;
const _subscribers = [];

const _dispatch = action => {
    const nextState = _reduce(_state, action);
    if (nextState !== _state) {
        _state = nextState;
        _subscribers.forEach(cb => cb(_state, _dispatch, _getState));
    }
}

const _getState = () => _state;

export default class Store {
    constructor(state, reducer) {
        // No fancy map / reduce (yet)..
        _reduce = reducer;
        _state = _reduce({...state}, {type: 'store/INIT'});

        this.dispatch = _dispatch;
        this.getState = _getState;
    }

    subscribe(cb) {
        _subscribers.push(cb);
    }
}
