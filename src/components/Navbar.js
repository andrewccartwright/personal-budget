import React from "react";
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logout(false, null);
    }
    
    render() {
        return (
            <div id="navbar">
                <h1 id="title">My Budget</h1>

                <div id="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/expenses">Expenses</Link>
                    <Link to="/income">Income</Link>
                </div>

                <div id="logout-button">
                    {this.props.isLoggedIn && <GoogleLogout 
                            clientId="927860803106-011sasieminlghlvr9fu65veou7eo8uj.apps.googleusercontent.com"
                            buttonText="Log Out"
                            onLogoutSuccess={this.logout}
                        />}
                </div>
                
            </div>
        )
    }
}