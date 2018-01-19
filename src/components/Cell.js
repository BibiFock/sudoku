import React from 'react'
import classNames from 'classnames'

export default class Cell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        if (!/^[0-9]$/.test(event.target.value)) {
            return false;
        }

        this.setState({ value: event.target.value });
    }

    render() {
        var cellClass = classNames(
            'Sudoku-Cell',
            'y' + (this.props.y)
        );
        return <div className={cellClass}>
                <input type="text" maxLength="1"
                    value={this.state.value}
                    onChange={this.handleChange}/>
            </div>
    }
}
