import React, { Component, PropTypes } from 'react';
import NavigationBar from '../AdminNavigationBar'

// import NavBar from '../widgets/MainNavBar';
// import RaisedButton from 'material-ui/RaisedButton';
export default class MainLayout extends Component {
    static propTypes = {
        children : PropTypes.object
    };

    render() {
        const { children } = this.props;

        return (
            <div>
                <NavigationBar/>
                {children}
            </div>
        );
    }
}
