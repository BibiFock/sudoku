import React from 'react'

import Sudoku from './components/Sudoku'
import Solver from './components/Solver'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Solver />
                <Sudoku />
            </div>
        );
    }
}


