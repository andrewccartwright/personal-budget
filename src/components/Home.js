import React from 'react';
import ExpenseTable from './ExpenseTable';
import IncomeTable from './IncomeTable';
import '../css/Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        
    }


    render() {
        return (
            <div>
                <div id="tables-section">

                    <ExpenseTable email={this.props.email} />
                    <IncomeTable email={this.props.email} />
                </div>
                
            </div>
        );
    }
}