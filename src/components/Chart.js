import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts';

import '../css/Chart.css';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     console.log(this.props.data);

    //     const chartData = [
    //         {y: 2500, label: 'Paycheck 1'},
    //         {y: 2500, label: 'Paycheck 2'},
    //         {y: 800, label: 'Side Hustle'}
    //     ];

    //     this.props.data.forEach((item) => {
    //         const obj = {
    //             y: item.actual,
    //             label: item.name
    //         }

    //         console.log(obj);

    //         chartData.push(obj);
    //     });

    //     console.log(chartData);

    //     this.setState({
    //         data: chartData
    //     })
    // }

    render() {
        const chartData = [];

        this.props.data.forEach((item) => {
            const obj = {
                y: item.actual,
                label: item.name
            }

            chartData.push(obj);
        });

        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1",
            title: {
                text: `${this.props.title} Breakdown`
            },
            data: [{
                type: 'pie',
                indexLabel: '{label}: ${y}',
                startAngle: -90,
                dataPoints: chartData
            }]
        }

        return (
            <div id="pie-chart">
                <CanvasJSChart className="chart" options={options} />
            </div>
        )
    }
}