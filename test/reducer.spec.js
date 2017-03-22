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
			player1: {name: 'computer'},
			player2: {name: 'user'}
		});
	});

	it('should pit computer against computer in demo mode', () => {
		const newState = reducer(state, action(actions.DEMO));
		expect(reducer(newState, action(actions.RUN)).game).to.deep.equal({
			player1: {name: 'computer'},
			player2: {name: 'computer'}
		});
	});

	it('should register player strike', () => {
		let newState = reducer(state, action(actions.RUN));
		expect(reducer(newState, action(actions.STRIKE, {player: 'player1', strike: 'pow'})).game).to.deep.equal({
			player1: {name: 'computer', strike: 'pow'},
			player2: {name: 'user'}
		});
	});

	it('should preserve history on new run', () => {
		state.history = [1, 2, 3];
		expect(reducer(state, action(actions.RUN)).history).to.be.equal(state.history);
	});

	it('should push game results on end game', () => {
		let newState = reducer(state, action(actions.RUN));
		newState = reducer(newState, action(actions.END, 'player1'));
		expect(newState.results).to.be.true;
		expect(newState.game).not.to.be.defined;
		expect(newState.history.length).to.be.equal(1);
		expect(newState.history[0]).to.deep.equal({
			winner: 'player1',
			player1: {name: 'computer'},
			player2: {name: 'user'}
		});
	});

	it('should reset game on start', () => {
		let newState = reducer(state, action(actions.RUN));
		newState = reducer(newState, action(actions.END));
		newState = reducer(newState, action(actions.START));
		expect(newState.results).to.be.false;
		expect(newState.game).to.be.defined;
	});
});
