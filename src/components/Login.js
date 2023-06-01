import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { GoogleLogin } from 'react-google-login';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.responseSuccess = this.responseSuccess.bind(this);
        this.responseFailure = this.responseFailure.bind(this)
    }

    responseSuccess(response) {
        const em = response.profileObj.email;

        
        this.props.handleSuccess(true, em);
    }

    responseFailure(response) {
        this.props.handleFailure(false, null);
    }



    render() {
        return (
            <div>
                <Navbar />
                <div className="container" style={{marginTop: '12vh'}}>
                    <div className="jumbotron text-center text-primary">
                        <h1><span className="fa fa-lock">My Budget</span></h1>
                        <p>Login or Register with:</p>

                        <GoogleLogin
                            clientId='927860803106-011sasieminlghlvr9fu65veou7eo8uj.apps.googleusercontent.com'
                            buttonText={'Sign in with Google'}
                            onSuccess={this.responseSuccess}
                            onFailure={this.responseFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />

                    </div>
                </div>
            </div>
        )
    }
}