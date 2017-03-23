import {actions} from '../actions';
import * as c from '../constants';

export default (start, dispatch) => {
    const next = start - 1;
    const wait = start === 4 ? c.READY_TIME : c.COUNTDOWN_TIME;

    // Ready? then count down from three and GO!
    if (start > 0) {
        setTimeout(() => dispatch({type: actions.START, value: next}), wait);
    }

    if (start === 0) {
        dispatch({type: actions.RUN});
    }
};
