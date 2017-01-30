import React from 'react'

import NavItem from './NavigationItem'

class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <div>
                        <div>
                            <a href="#">boilerplate</a>
                        </div>
                        <div>
                            <ul>
                                <NavItem to='/test' index={true} >Testing</NavItem>
                                <NavItem to='/'>Guests</NavItem>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavigationBar
