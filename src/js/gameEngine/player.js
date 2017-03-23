import {actions} from '../actions';
import * as c from '../constants';
import randomInt from '../utils/randomInt';
import rules from './rules';

export default class Player {
    // The computer is sneaky!
    // Knowing (or thinking) that it is playing against a human, it uses its
    // whiplash reactions to wait out the other player. If the other player
    // strikes first, it KNOWS how to win!!!!
    // This is a risky strategy because of the randomness of the game play window: 500ms +/ (0..100ms)
    constructor(player, dispatch, getState) {
        const game = getState().game;
        this.player = game[player];

        if (this.player.name !== 'user') {
            const otherPlayer = `player${player.endsWith('1') ? 2 : 1}`;

            // Start the waiting game
            const wait = c.COMPUTER_DELAY + randomInt(0-c.DELTA_TIME, c.DELTA_TIME);
            setTimeout(() => {
                const latestGame = getState().game;
                // There is still time if game is still ongoing
                if (latestGame) {
                    // Extract the other player's strike (if any) and
                    // use the rules to determine a winning blow!
                    const blow = latestGame[otherPlayer].strike;
                    let strike;
                    if (blow) {
                        strike = rules.beats(blow);
                    }
                    else {
                        // Hand is forced. Strike out!
                        // Todo: Inject strategy so that user can select difficulty level
                        const pickOne = randomInt(0, 2);
                        strike = rules.list[pickOne].beats;
                    }
                    dispatch({
                        type: actions.STRIKE,
                        value: {
                            player,
                            strike
                        }
                    });
                }
            }, wait);
        }
    }
}
