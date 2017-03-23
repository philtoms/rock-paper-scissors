import {actions} from './actions';

export default (state, action) => {
    switch (action.type) {
        case actions.SHOW_RULES:
            return {
                ...state,
                rules: true
            }

        case actions.HIDE_RULES:
            return {
                ...state,
                rules: false
            }

        case actions.DEMO:
            return {
                demo: true,
                history: state.history,
                start: action.value === undefined ? 4 : action.value
            }

        case actions.START:
            return {
                history: state.history,
                demo: state.demo,
                start: action.value === undefined ? 4 : action.value
            }

        case actions.RUN:
            return {
                history: state.history,
                game: {
                    demo: state.demo,
                    player1: {name: state.demo ? 'player 1' : 'computer'},
                    player2: {name: state.demo ? 'player 2' : 'user'}
                }
            }

        case actions.STRIKE: {
            if (!state.game) return state;
            // TODO: tidy up this mess!
            // Normalize the action values by wrapping the generator action in a HOF.
            const player = action.value.player || 'player2';
            const strike = typeof action.value === 'string' ? action.value : action.value.strike;

            return {
                ...state,
                game: {
                    ...state.game,
                    firstStrike: state.game.firstStrike || strike,
                    secondStrike: state.game.firstStrike && strike,
                    [player]: {
                        ...state.game[player],
                        strike
                    }
                }
            }
        }

        case actions.END:
            return {
                endGame: state.game,
                history: state.history
            }

        case actions.RESULT: {
            const results = {
                ...state.endGame,
                winner: action.value
            };

            // Store history for possible future computer game stratagies.
            // Visit http://www.rpscontest.com/ for inspiration.
            return {
                results,
                history: [...state.history, results]
            }
        }

        default:
            return state;
    }
}
