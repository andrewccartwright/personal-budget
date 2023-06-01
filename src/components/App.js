import React from 'react';
import Home from './Home';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import '../css/App.css';
import { render } from 'react-dom';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';
import Navbar from './Navbar';
import axios from 'axios';
import Login from './Login';
import Welcome from './Welcome';

const url = 'https://personal-budget-app-2.herokuapp.com';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserAuthenticated: false,
      userEmail: 'test@email.com'
    }


    this.updateState = this.updateState.bind(this);
  }

  updateState(bool, email) {
    this.setState({
      isUserAuthenticated: bool,
      userEmail: email
    });
  }

  render() {
    return (
      <div className="App">

        <Router>
        {!this.state.isUserAuthenticated ? <Login handleSuccess={this.updateState} handleFailure={this.updateState} /> : 
          <div>
            <Navbar isLoggedIn={this.state.isUserAuthenticated} logout={this.updateState} />
          
            <Routes>
              <Route path="/" exact element={<Welcome isUserAuthenticated={this.state.isUserAuthenticated} />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/home" exact element={<Home email={this.state.userEmail} />} />
              <Route path="/expenses" exact element={<ExpenseTable email={this.state.userEmail} />} />
              <Route path="/income" exact element={<IncomeTable email={this.state.userEmail} /> } />
            </Routes>
          </div>
       }
        </Router>

      </div>
    );
  }
  
}

export default App;
