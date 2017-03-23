import {actions} from '../actions';
import * as c from '../constants';
import randomInt from '../utils/randomInt';
import Player from './player';

export default (game, dispatch, getState) => {
    if (game && !game.firstStrike) {
        // This is the very point where skill and luck fight it out!
        // The browser setTimer has a resolution of 4ms which isn't
        // enough for a fair duel with a computer. So a random delta
        // between -100ms and +100ms is added to the state change such
        // that the computer cannot reliably wait out the other player.
        const wait = c.DELAY_TIME + randomInt(0-c.DELTA_TIME, c.DELTA_TIME);
        setTimeout(() => dispatch({type: actions.END, wait}), wait);

        // Set up the players
        new Player('player1', dispatch, getState);
        new Player('player2', dispatch, getState);
    }
};
