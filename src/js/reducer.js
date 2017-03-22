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
                ...state,
                demo: true
            }

        case actions.START:
            return {
                ...state,
                results: false,
                start: action.value === undefined ? 4 : action.value
            }

        case actions.RUN:
            return {
                history: state.history,
                game: {
                    player1: {name: 'computer'},
                    player2: {name: state.demo ? 'computer' : 'user'}
                }
            }

        case actions.STRIKE:
            return {
                ...state,
                game: {
                    ...state.game,
                    [action.value.player]: {
                        ...state.game[action.value.player],
                        strike: action.value.strike
                    }
                }
            }

        case actions.END:
            return {
                results: true,
                history: [...state.history, {
                    ...state.game,
                    winner: action.value
                }]
            }

        default:
            return state;
    }
}
