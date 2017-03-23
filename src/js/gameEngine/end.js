import {actions} from '../actions';
import rules from './rules';

export default (endGame, dispatch) => {
    if (endGame) {
        // We have a winner!
        const {player1, player2} = endGame;
        const winner = rules.winner(player1, player2);
        dispatch({type: actions.RESULT, value: winner});
    }
};
