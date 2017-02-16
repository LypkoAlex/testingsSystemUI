import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'mobx-react';

import routes from './Routes'
import stores from './stores'
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/paper/bootstrap.css';
import './style.css';
// const init GuestStore.fromJS(initialState.guests)


ReactDOM.render((
    <Provider {...stores}>
        <Router history={browserHistory} routes={routes()}>
        </Router>
    </Provider>
), document.querySelector("#root"))
