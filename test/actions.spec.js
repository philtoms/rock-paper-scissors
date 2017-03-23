import actions from '../src/js/actions';

describe('actions', () => {

    let fakeHandler;
    let calledWith;

    describe('registration', () => {
        beforeEach(() => {
            fakeHandler = cb => calledWith = cb;
            calledWith = null;
        });

        it('should initialize action generator', () => {
            const generator = actions(fakeHandler);
            expect(generator.forEach).to.be.defined;
        });

        it('should register action handler with generator', () => {
            actions(fakeHandler).forEach(action => action);
            expect(typeof calledWith).to.equal('function');
        });

        it('should call action handler when generating', () => {
            actions(fakeHandler).forEach(action => action);
            fakeHandler('EVENT');
            expect(calledWith).to.equal('EVENT');
        });
    });

    describe('generator', () => {
        let fakeListener;

        beforeEach(() => {
            fakeHandler = cb => {
                fakeListener = event => cb(event);
            }
        });

        it('should NOT call action handler for un-registered values', () => {
            let handled = null;
            actions(fakeHandler).forEach(action => handled = action);
            fakeListener('WRONG_EVENT');
            expect(handled).to.equal(null);
        });

        it('should call action handler for registered values', () => {
            let handled = [];
            actions(fakeHandler).forEach(action => handled.push(action));
            fakeListener({key: 'S'});
            fakeListener({key: 'D'});
            fakeListener({key: 'R'});
            fakeListener({key: 's'});
            fakeListener({key: 'd'});
            fakeListener({key: 'r'});
            expect(handled.length).to.equal(6);
        });
    });
});
