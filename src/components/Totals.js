import React from "react";

export default class Totals extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const totalPlanned = this.props.data.reduce((sum, obj) => { return sum + parseFloat(obj.planned); }, 0);
        const totalActual = this.props.data.reduce((sum, obj) => { return sum + parseFloat(obj.actual); }, 0);
        const totalDifference = totalPlanned - totalActual;

        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>Planned: ${totalPlanned}</p>
                <p>Actual: ${totalActual}</p>
                <p>Difference: ${totalDifference}</p>
            </div>
        )
    }
}