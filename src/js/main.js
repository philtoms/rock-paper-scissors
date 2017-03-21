require('../css/main.scss');

import actions from './actions';
import {dispatch} from './utils/reducer';

import print from './module';

const handler = document.addEventListener.bind(null, 'keydown');

actions(handler).forEach(action => {
    dispatch(action);
})

print('it works well!');
