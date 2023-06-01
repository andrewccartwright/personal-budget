import React from 'react';
import axios from 'axios';
import Table from './Table';
import Chart from './Chart';
import Totals from './Totals';

const url = 'https://personal-budget-app-2.herokuapp.com';

export default class ExpenseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesArray: []
        }
    }

    componentDidMount() {

        axios.get(url + '/expenses', { withCredentials: true, params: {email: this.props.email} })
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
                <Chart title="Expenses" data={this.state.expensesArray} />

                <Totals title="Expenses" data={this.state.expensesArray} />

                <Table title="Expenses" button='Add Expense' path="/expenses" array={this.state.expensesArray} email={this.props.email} />
            </div>
        )
    }
}