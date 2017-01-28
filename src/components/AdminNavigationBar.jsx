import React from 'react'
import CSSModules from 'react-css-modules'

import NavItem from './NavigationItem'
import styles from './NavigationBar.css'

class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <nav className={styles.headernav}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <a className={styles.brand} href="#">boilerplate</a>
                        </div>
                        <div className={styles.menu_list}>
                            <ul className={styles.nav_list}>
                                <NavItem to='/admin/spaciality'>Speciality</NavItem>
                                <NavItem to='/admin'>Guests</NavItem>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default CSSModules(NavigationBar, styles, {allowMultiple: true})
