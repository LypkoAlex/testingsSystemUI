import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react';

import routes from './Routes'
import stores from './stores'

// const init GuestStore.fromJS(initialState.guests)


ReactDOM.render((
    <Provider {...stores}>
        <Router history={browserHistory} routes={routes()}>
        </Router>
    </Provider>
), document.querySelector("#root"))
