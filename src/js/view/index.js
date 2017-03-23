import rules from './rules';
import game from './game';

export default props => {
    rules(props.rules);
    game(props.start, props.game, props.results, props.history);
};
