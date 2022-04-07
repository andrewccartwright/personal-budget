import React from 'react';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Add {this.props.type}</h1>

                <form>
                    <label></label>
                </form>
            </div>
        )
    }
}