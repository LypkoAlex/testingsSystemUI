import CSSModules from 'react-css-modules'
import {container, jumbotron, buttons} from 'bootstrap-css'
import React from 'react'
import ReactDOM from 'react-dom'
import DevTool from 'mobx-react-devtools'
import {observer} from 'mobx-react'

import About from './About'

import styles from './App.css'
Object.assign(styles, jumbotron, container, buttons)

@observer
class App extends React.Component {
    render() {
        const {guestStore} = this.props.route
        return (
            <div className={styles.container}>
                <DevTool/>
                {this.props.children}
            </div>
        );
    }
}

export default CSSModules(App, styles)
