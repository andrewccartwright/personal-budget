import React from "react";
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
    
    render() {
        return (
            <div id="navbar">
                <h1 id="title">My Budget</h1>

                <div id="navbar-links">
                    <Link to="/">Home</Link>
                    <Link to="/expenses">Expenses</Link>
                    <Link to="/income">Income</Link>
                </div>
            </div>
        )
    }
}