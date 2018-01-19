import React, { Component } from 'react'
import Cell from './Cell'

import './Sudoku.css'

export default class Sudoku extends Component {
    constructor(props) {
        super(props)
        let lines = [];
        for (let i = 0; i < 9; i++) {
            let line = [];
            for (let j = 0; j < 9; j++) {
                line.push(0);
            }
            lines.push(line);
        }
        this.state = { lines };
    }

    render() {
        var grid = this.state.lines.map((line, x) => {
            return <div className={"Sudoku-Row x" + x} key={x}>
                { line.map((cell, y) => <Cell value={cell} key={y} y={y} />) }
            </div>;
        });

        return (
            <div className="Sudoku"> { grid } </div>
        )
    }
}
