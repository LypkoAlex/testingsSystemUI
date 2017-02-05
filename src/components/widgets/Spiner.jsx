import React from 'react'
import MDSpinner from "react-md-spinner";

class Spiner extends React.Component {
    render() {
        return (
            <div className='loadingBlock'>
                <MDSpinner className='spinerLoading'/>
            </div>
        )
    }
}

export default Spiner
