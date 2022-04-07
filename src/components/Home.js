import React from 'react';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';
import '../css/Home.css';

export default class Home extends React.Component {

    render() {
        return (
            <div>
                <div id="tables-section">
                    <ExpenseTable />
                    <IncomeTable />
                </div>
                
            </div>
        );
    }
}