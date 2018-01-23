import cloneDeep from 'lodash/cloneDeep'
import * as Actions from '../actions/Constants'
import * as Utils from '../utils'

export default function(state, action) {
    if (!state) {
        state = {
            grid: Utils.createEmptyGrid(),
            gridSrc: Utils.createEmptyGrid(),
            isEmpty: true
        }
    }

    switch (action.type) {
        case Actions.UPDATE_CELL:
            let {row, col, val} = action.cell;
            let changedRow = [
                ...state.grid[row].slice(0, col),
                val,
                ...state.grid[row].slice(col + 1)
            ];
            state.grid = [
                ...state.grid.slice(0, row),
                changedRow,
                ...state.grid.slice(row + 1)
            ];
            break;
        case Actions.SOLVE:
            state.grid = Utils.solveIt(
                ( !state.isEmpty ? state.gridSrc : state.grid)
            );
            break;
        case Actions.LOAD_GRID:
            let grid = Utils.getGrid(action.index)
            state.grid = cloneDeep(grid)
            state.gridSrc = cloneDeep(grid)
            state.isEmpty = false
            break;
        case Actions.CLEAR:
            state = {
                grid: Utils.createEmptyGrid(),
                gridSrc: Utils.createEmptyGrid(),
                isEmpty: true
            };
            break
        default:
            break;
    }

    state.isOk = Utils.validGrid(state.grid)

    return cloneDeep(state);
}

