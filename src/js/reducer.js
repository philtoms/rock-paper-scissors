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
                start: action.value || 1
            }

        case actions.RUN:
            return {
                history: state.history,
                game: {
                    player1: 'computer',
                    player2: state.demo ? 'computer' : 'user'
                }
            }

        case actions.END:
            return {
                results: true,
                history: [...state.history, {...state.game, ...action.value}]
            }

        default:
            return state;
    }
}
