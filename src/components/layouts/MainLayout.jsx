import React, { Component, PropTypes } from 'react';
import NavigationBar from '../NavigationBar'
import {
    Navbar,
    Nav,
    Grid,
    NavDropdown,
    MenuItem
} from 'react-bootstrap'
// import NavBar from '../widgets/MainNavBar';
// import RaisedButton from 'material-ui/RaisedButton';
export default class MainLayout extends Component {
    static propTypes = {
        children : PropTypes.object
    };

    render() {
        const { children } = this.props;

        return (
            <div className='container'>
                <NavigationBar/>
                <Grid>
                    {children}
                </Grid>
            </div>
        );
    }
}
