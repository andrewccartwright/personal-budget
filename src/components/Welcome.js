import React from "react";
import { Navigate } from 'react-router-dom';

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    componentDidMount() {
        this.setState({
            redirect: this.props.isUserAuthenticated ? <Navigate to='/home' /> : <Navigate to="/login" />})
    }

    render() {
        return (
            <div>
                <h1 style={{marginTop: '12vh'}}>Hello there</h1>

                {this.state.redirect}
            </div>
        )
    }
}