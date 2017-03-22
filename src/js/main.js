require('../css/main.scss');

import Store from './utils/store';
import actions from './actions';
import reducer from './reducer';
import render from './view';

const initialState = {};
const store = new Store(initialState, reducer);

// Our 'connect' point laid bare.
// Easily improved with selector HOF:
//  subscribe(select(render)) or maybe compose(subscribe, select, render);
store.subscribe(render);

// Create a bound action handler for keyboard events.
// This abstraction allows for future event aggregation, perhaps adding
// mouse click events etc,.
const handler = document.addEventListener.bind(null, 'keydown');

actions(handler).forEach(action => {
    store.dispatch(action);
})
