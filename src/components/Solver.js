import React from 'react'
import { connect } from 'react-redux'
import { solveIt, clearIt, loadGrid } from '../actions'

import './Solver.css'

const Solver = ({ dispatch, haveError }) => {
    let solve = () => dispatch(solveIt())
    let clear = () => dispatch(clearIt())
    let loadIt = (nb) => dispatch(loadGrid(nb))

    return (
        <div className="actions">
            <div className="actions-body">
                <button type="button" onClick={() => loadIt(0)}>load grid 1</button>
                <button type="button" onClick={() => loadIt(1)}>load grid 2</button>
                <button type="button" onClick={clear}>clear</button>
                <button disabled={haveError ? 'disabled': ''}
                    type="button" onClick={solve}>résoudre</button>
            </div>
        </div>
    )
}


export default connect(
    (state) => ({
        haveError: !state.isOk
    })
)(Solver)
