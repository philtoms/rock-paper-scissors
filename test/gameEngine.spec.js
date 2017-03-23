import gameEngine from '../src/js/gameEngine';
import Player from '../src/js/gameEngine/player';
import rules from '../src/js/gameEngine/rules';

let _setTimeout;
let calledWith;
let state;
const fakeDispatch = action => calledWith = action;
const fakeGetState = () => state

beforeEach(() => {
    _setTimeout = window.setTimeout;
    window.setTimeout = cb => cb();
    state = {
        game: {
            player1: {name: 'x'},
            player2: {name: 'y'}
        }
    };
});

afterEach(() => {
    window.setTimeout = _setTimeout;
})

describe('gameEngine', () => {

    describe('start game', () => {
        it('should start a count down', () => {
            gameEngine({start: 4}, fakeDispatch);
            expect(calledWith).to.deep.equal( { type: 'rps/START', value: 3 });
        });

        it('should end a count down', () => {
            gameEngine({start: 0}, fakeDispatch);
            expect(calledWith).to.deep.equal( { type: 'rps/RUN' });
        });
    });

    describe('run game', () => {
        it('should end game after +ve random wait', () => {
            gameEngine({game: true}, fakeDispatch, fakeGetState);
            expect(calledWith.type).to.equal('rps/STRIKE');
            expect(calledWith.wait).to.be.defined;
        });
    });

    describe('end game', () => {
        it('should post results', () => {
            const endGame = {
                player1: {},
                player2: {}
            };

            gameEngine({endGame}, fakeDispatch);
            expect(calledWith.type).to.equal('rps/RESULT');
        });
    });
});

describe('Player', () => {
    it('should auto strike if computer', () => {
        state.game.player1.name = 'computer';
        new Player('player1', fakeDispatch, fakeGetState);
        expect(calledWith.type).to.equal('rps/STRIKE');
    });
});

describe('Rules', () => {
    let p1, p2;
    beforeEach(() => {
        p1 = {};
        p2 = {};
    });

    it('should post tie when no strikes', () => {
        expect(rules.winner(p1, p2)).to.equal('tie');
    });

    it('should post tie when equal strikes', () => {
        p1.strike = 'pow';
        p2.strike = 'pow';
        expect(rules.winner(p1, p2)).to.equal('tie');
    });

    it('should post paper beats rock', () => {
        p1.strike = 'paper';
        p2.strike = 'rock';
        expect(rules.winner(p1, p2)).to.equal('player1');
    });

    it('should post rock beats scissors', () => {
        p1.strike = 'rock';
        p2.strike = 'scissors';
        expect(rules.winner(p1, p2)).to.equal('player1');
    });

    it('should post scissors beats paper', () => {
        p1.strike = 'scissors';
        p2.strike = 'paper';
        expect(rules.winner(p1, p2)).to.equal('player1');
    });
});
