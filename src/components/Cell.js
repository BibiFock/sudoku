import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateCell } from '../actions/'
import { getForbiddenNumbers } from '../utils/'

class Cell extends React.Component {
    componentWillMount() {
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
    }

    onClick (event) {
        if (this.props.cell.isFixed) {
            return false
        }
        event.preventDefault()
        event.target.select()
    }

    onChange (event) {
        let { cell, onCellChange } = this.props;
        if (cell.isFixed) {
            return false
        }
        if (!/^[0-9]{0,1}$/.test(event.target.value)) {
            event.preventDefault()
            event.target.select()
            return false;
        }
        cell.val = parseInt(event.target.value, 10)

        onCellChange(cell)
    }

    render ()  {
        const { cell } = this.props;
        var cellClass = classNames(
            'Sudoku-Cell',
            'y' + (cell.col),
        );

        var inputClass = classNames(
            { 'fixed': cell.isFixed },
            { 'error': cell.error }
        );

        return (
            <div className={cellClass}>
            <input type="text" maxLength="1"
                value={(cell.val ? cell.val : ' ')}
                className={inputClass}
                onClick={this.onClick}
                onChange={this.onChange}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { row, col } = ownProps
    let value = state.grid[row][col];
    let isFixed = (state.gridSrc[row][col] !== 0)
    let isError = getForbiddenNumbers(state.grid, row, col).indexOf(value) > -1

    return {
        cell: {
            val: value,
            col: ownProps.col,
            row: ownProps.row,
            isFixed: isFixed,
            error: isError
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCellChange: (cell) => {
            dispatch(updateCell(cell))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cell)
