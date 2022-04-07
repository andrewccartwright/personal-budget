import React from 'react';
import Home from './Home';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import '../css/App.css';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/expenses" exact element={<ExpenseTable />} />
            <Route path="/income" exact element={<IncomeTable /> } />
          </Routes>
        </Router>
      </div>
    );
  }
  
}

export default App;
