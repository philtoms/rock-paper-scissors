import Store from '../src/js/utils/store';

describe('store', () => {
	const initialState = {initial: true};
	const reducer = (state, action) => {
		calledWith = {state, action};
		return action.type === 'update' ? {value: action.value} : state;
	};

	let store;
	let calledWith;

	beforeEach(() => {
		store = new Store(initialState, reducer);
	});

	it('should register initial state', () => {
		expect(calledWith.action.type).to.equal('store/INIT');
	});

	it('should get state', () => {
		expect(store.getState()).to.deep.equal(initialState);
	});

	it('should dispatch action', () => {
		const action = {type: 'action', value: 123};
		store.dispatch(action);
		expect(calledWith.action).to.deep.equal(action);
	});

	it('should call subscribers on state change', () => {
		const action = {type: 'update', value: 123};
		store.subscribe(newState => calledWith = newState);
		store.dispatch(action);
		expect(calledWith).to.deep.equal({ value: 123 });
	});

	it('should NOT call subscribers when no state change', () => {
		const action = {type: 'don\'t update', value: 123};
		store.subscribe(newState => calledWith = newState);
		store.dispatch(action);
		expect(calledWith).not.to.deep.equal({ value: 123 });
	});
});
