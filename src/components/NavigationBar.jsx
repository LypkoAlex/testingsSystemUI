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
                    <Navbar.Brand className='logoImg'>
                        <Link to='/'><img src='/img/2-layers.png' /></Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem to='/test'>Testing</NavItem>
                    <NavItem to='/search'>Search</NavItem>
                    <NavItem to='/restore'>Restore</NavItem>
                    <NavItem to='/feedback'>Feedback</NavItem>
                    <NavItem to='/info'>Info</NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar
