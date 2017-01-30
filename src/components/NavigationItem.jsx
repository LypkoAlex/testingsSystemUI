import React, { Component } from 'react'
import { Link, IndexLink, withRouter } from 'react-router'


class NavItem extends Component {
  render () {
    const { router } = this.props
    const { index, to, children, ...props } = this.props

    const LinkComponent = index ?  IndexLink : Link

    return (
        <li className='nav-item'>
            <Link to={to}>{children}</Link>
        </li>
    )
  }
}

NavItem = withRouter(NavItem)

export default NavItem
