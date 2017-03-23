import showHide from '../utils/showHide';
import rules from '../gameEngine/rules';

const togglePrompt = showHide('game__countdown');
const togglePlay = showHide('game__play');
const toggleResult = showHide('game__result');

const winningName = results => {
    if (results.winner === 'tie') {
        return 'SHUCKS - A TIE'
    }

    if (results.demo) {
        return `PLAYER ${results.winner.slice(-1)} (COMPUTER) WINS`;
    }

    return results.winner === 'player1' ? 'COMPUTER WINS' : 'YOU WIN';
};

const winningStrike = results => {
    const winner = results[results.winner];
    if (winner) {
        if (!results.player1.strike) {
            return `${results.demo ? 'Player 1' : 'Computer'} ran out of time`;
        }
        if (!results.player2.strike) {
            return `${results.demo ? 'Player 2' : 'You'} ran out of time (or hit too soon!)`;
        }
        return rules.by(winner.strike);
    }
    if (!results.player1.strike) {
        return `You both waited too long!`;
    }
    return `You both struck out with ${results.player1.strike}`;
};

export default (start, game, results) => {
    const countDown  = togglePrompt(start);
    if (countDown) {
        const text = start === 4 ? 'Ready?' : start;
        countDown.innerText = text;
    }

    const play = togglePlay(game);
    if (play) {
        play.innerHTML = `<div>
            <p>${game.firstStrike || 'GO!'}</p>
            <p>${game.secondStrike || ''}</p>
        </div>`;
    }

    const result = toggleResult(results);
    if (result) {
        result.innerHTML = `<div>
            <h2>${winningName(results)}</h2>
            <p>${winningStrike(results)}</p>
        </div>`;
    }
}
