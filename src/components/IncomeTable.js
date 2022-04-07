import axios from 'axios';
import React from 'react';
import Table from './Table';

const url = 'https://personal-budget-app-2.herokuapp.com';

export default class IncomeTable extends React.Component {
    constructor() {
        super();
        this.state = {
            incomeArray: []
        }
    }

    componentDidMount() {
        axios.get(url + '/income')
            .then((res) => {
                res.data.map((item) => {
                    const difference = (Math.round(10 * (item.planned - item.actual)) / 10).toFixed(2);
                    item.difference = difference;
                });

                this.setState({
                    incomeArray: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div id="income-table" style={{marginTop: '12vh'}}>
                <Table title="Income" button="Add Income" path="/income" array={this.state.incomeArray} />

            </div>
        )
    }
}