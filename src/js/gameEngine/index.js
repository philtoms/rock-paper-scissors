import countDown from './start';
import run from './run';
import end from './end';

// Simple dispatch pattern used again so that memoisation can be easily applied
export default ({start, game, endGame}, dispatch, getState) => {
    countDown(start, dispatch);
    run(game, dispatch, getState);
    end(endGame, dispatch);
};
