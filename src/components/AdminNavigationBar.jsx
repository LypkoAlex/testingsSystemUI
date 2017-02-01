import React from 'react'
import { Link } from 'react-router'
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem,
    Button
} from 'react-bootstrap'
import NavItem from './NavigationItem'
import { observer, inject, propTypes as MobxTypes } from 'mobx-react';
import { observable } from 'mobx';

@inject('authStore') @observer

class NavigationBar extends React.Component {
    render() {
        const { isAuth, logOut } = this.props.authStore;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>TestSystem</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem to='/admin/questions'>  Questions </NavItem>
                    <NavItem to='/admin/exams'>      Exams      </NavItem>
                    <NavItem to='/admin/subjects'>   Subjects   </NavItem>
                    <NavItem to='/admin/spaciality'> Speciality </NavItem>
                </Nav>
                {   isAuth ?
                    <Nav pullRight className='logOut'>
                        <Button onClick={logOut} className='nav-item'>logOut</Button>
                    </Nav> :
                    null
                }
            </Navbar>
        )
    }
}

export default NavigationBar
