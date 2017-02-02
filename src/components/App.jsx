import React from 'react'
import ReactDOM from 'react-dom'
import {observer} from 'mobx-react'

@observer
class App extends React.Component {
    render() {
        const {guestStore} = this.props.route
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default App
