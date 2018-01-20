import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { updateCell } from '../actions/'
import { getForbiddenNumbers } from '../utils/'

class Cell extends React.Component {
    componentWillMount() {
        const { val } = this.props.cell;
        this.setState({isFixed: val ? true : false});
    }

    render ()  {
        const { cell, onCellChange } = this.props;
        var cellClass = classNames(
            'Sudoku-Cell',
            'y' + (cell.col),
        );

        var onClick = (event) => {
            event.preventDefault()
            event.target.select()
        }

        var onChange = (event) => {
            if (!/^[0-9]{0,1}$/.test(event.target.value)) {
                event.preventDefault()
                event.target.select()
                return false;
            }
            cell.val = parseInt(event.target.value, 10)

            onCellChange(cell)
        }

        if (cell.isFixed) {
            onChange = onClick = () => false
        }

        var inputClass = classNames(
            { 'fixed': cell.isFixed },
            { 'error': cell.error }
        );
        return (
            <div className={cellClass}>
            <input type="text" maxLength="1"
                value={(cell.val ? cell.val : ' ')}
                className={inputClass}
                onClick={onClick}
                onChange={onChange}/>
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
