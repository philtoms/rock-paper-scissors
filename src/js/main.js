require('../css/main.scss');

import Store from './utils/store';
import actions from './actions';
import reducer from './reducer';
import render from './view';
import gameEngine from './gameEngine';

const initialState = {history: []};
const store = new Store(initialState, reducer);

// Our 'connect' point laid bare.
// Easily memoised with selector HOF:
//  subscribe(select(render));
store.subscribe(render);
store.subscribe(gameEngine);

// Create a bound action handler for keyboard events.
// This abstraction allows for future event aggregation, perhaps adding
// mouse click events etc,.
const handler = document.addEventListener.bind(null, 'keydown');

actions(handler).forEach(action => {
    store.dispatch(action);
})
