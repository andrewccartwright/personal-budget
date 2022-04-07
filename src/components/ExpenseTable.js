import React from 'react';
import axios from 'axios';
import Table from './Table';

const url = 'https://personal-budget-app-2.herokuapp.com';

export default class ExpenseTable extends React.Component {
    constructor() {
        super();
        this.state = {
            expensesArray: []
        }
    }

    componentDidMount() {
        axios.get(url + '/expenses')
            .then((res) => {
                res.data.map((item) => {
                    const difference = (Math.round(10 * (item.planned - item.actual)) / 10).toFixed(2);
                    item.difference = difference;
                });

                this.setState({
                    expensesArray: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div id="expense-table" style={{marginTop: '12vh'}}>
                <Table title="Expenses" button='Add Expense' path="/expenses" array={this.state.expensesArray} />
            </div>
        )
    }
}