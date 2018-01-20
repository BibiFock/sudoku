import React from 'react'
import { connect } from 'react-redux'
import { updateCell } from '../actions/'
import classNames from 'classnames'

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
            if (!/^[0-9]$/.test(event.target.value)) {
                event.preventDefault()
                event.target.select()
                return false;
            }
            cell.val = event.target.value

            onCellChange(cell)
        }

        var inputClass = classNames(
            { 'fixed': this.state.isFixed }
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
    console.log(ownProps);
    return {
        cell: {
            val: state[ownProps.row][ownProps.col],
            col: ownProps.col,
            row: ownProps.row,
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
