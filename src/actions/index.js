import * as Actions from './Constants'

export function updateCell(cell) {
    return {
        type: Actions.UPDATE_CELL,
        cell
    };
}

export function solveIt() {
    return {
        type: Actions.SOLVE
    }
}

export function clearIt() {
    return {
        type: Actions.CLEAR
    }
}

export function loadGrid(index) {
    return {
        type: Actions.LOAD_GRID,
        index: index
    }
}
