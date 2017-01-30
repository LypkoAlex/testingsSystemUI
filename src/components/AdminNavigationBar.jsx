import React from 'react'
import { Link } from 'react-router'
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem
} from 'react-bootstrap'
import NavItem from './NavigationItem'
// import styles from './NavigationBar.css'

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
                    <NavItem to='/admin/questions'>  Questions </NavItem>
                    <NavItem to='/admin/exams'>      Exams      </NavItem>
                    <NavItem to='/admin/subjects'>   Subjects   </NavItem>
                    <NavItem to='/admin/spaciality'> Speciality </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavigationBar
