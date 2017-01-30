import React from 'react'
import ReactDOM from 'react-dom'
import DevTool from 'mobx-react-devtools'
import {observer} from 'mobx-react'

@observer
class App extends React.Component {
    render() {
        const {guestStore} = this.props.route
        return (
            <div>
                <DevTool/>
                {this.props.children}
            </div>
        );
    }
}

export default App
