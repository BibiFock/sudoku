import React from 'react'
import { connect } from 'react-redux'
import Cell from '../components/Cell'

import './Sudoku.css'

const Sudoku = ({ grid }) => (
    <div className="Sudoku">
        { grid.map((line, x) => (
            <div className={"Sudoku-Row x" + x} key={x}>
                { line.map((cell, y) => <Cell key={y} col={y} row={x} />) }
            </div>
        ))}
    </div>
)

export default connect(
    state => ({ grid: state.grid})
)(Sudoku)
