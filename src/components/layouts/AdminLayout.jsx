import React, { Component, PropTypes } from 'react';
import NavigationBar from '../AdminNavigationBar';
import { Grid } from 'react-bootstrap';
import SignIn from '../pages/SignIn.jsx'

import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

@inject('authStore') @observer

export default class MainLayout extends Component {
    static propTypes = {
        children : PropTypes.object
    };

    render() {
        const { children } = this.props;
        const { isAuth } = this.props.authStore;
        return (
            <div className='container'>
                <NavigationBar/>
                <Grid>
                    { !isAuth ? <SignIn/> : children}
                </Grid>
            </div>
        );
    }
}
