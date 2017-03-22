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

        case actions.START:
            return {
                ...state,
                rules: false
            }


        default:
            return state;
    }
}
