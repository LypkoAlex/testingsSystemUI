import React from 'react';
import { Link } from 'react-router';
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';
import NavItem from './NavigationItem';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>TestSystem</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem to='/test'>Testing</NavItem>
                    <NavItem to='/feedback'>Feedback</NavItem>
                    <NavItem to='/restore'>Restore</NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar
