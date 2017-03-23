import reducer from '../src/js/reducer';
import {actions} from '../src/js/actions';

const action = (type, value) => ({type, value});

describe('reducer', () => {
	let state;
	beforeEach(() => {
		state = {history: []};
	});

	it('should show rules', () => {
		expect(reducer(state, action(actions.SHOW_RULES)).rules).to.be.true;
	});

	it('should hide rules', () => {
		expect(reducer(state, action(actions.START)).rules).not.to.be.true;
	});

	it('should set demo mode', () => {
		expect(reducer(state, action(actions.DEMO)).demo).to.be.true;
	});

	it('should set start mode', () => {
		expect(reducer(state, action(actions.START, 2)).start).to.be.equal(2);
	});

	it('should generate new game on run', () => {
		expect(reducer(state, action(actions.RUN)).game).to.deep.equal({
			demo: undefined,
			player1: {name: 'computer'},
			player2: {name: 'user'}
		});
	});

	it('should pit computer against computer in demo mode', () => {
		const newState = reducer(state, action(actions.DEMO));
		expect(reducer(newState, action(actions.RUN)).game).to.deep.equal({
			demo: true,
			player1: {name: 'player 1'},
			player2: {name: 'player 2'}
		});
	});

	it('should register player strike', () => {
		let newState = reducer(state, action(actions.RUN));
		expect(reducer(newState, action(actions.STRIKE, {player: 'player1', strike: 'pow'})).game).to.deep.equal({
			demo: undefined,
			firstStrike: 'pow',
			secondStrike: undefined,
			player1: {name: 'computer', strike: 'pow'},
			player2: {name: 'user'}
		});
	});

	it('should preserve history on new run', () => {
		state.history = [1, 2, 3];
		expect(reducer(state, action(actions.RUN)).history).to.be.equal(state.history);
	});

	it('should set end game', () => {
		let newState = reducer(state, action(actions.RUN));
		newState = reducer(newState, action(actions.END, 'player1'));
		expect(newState.endGame).to.be.defined;
		expect(newState.game).not.to.be.defined;
	});


	it('should push game results to history', () => {
		state.endGame = {player1: 'user'};
		expect(reducer(state, action(actions.RESULT, 'player1'))).to.deep.equal({
			results: {
				player1: 'user',
				winner: 'player1'
			},
			history: [{
				player1: 'user',
				winner: 'player1'
			}]
		});
	});

	it('should reset game on start', () => {
		let newState = reducer(state, action(actions.RUN));
		newState = reducer(newState, action(actions.END));
		newState = reducer(newState, action(actions.START));
		expect(newState.results).not.to.be.defined;
		expect(newState.game).to.be.defined;
	});
});
