import cloneDeep from 'lodash/cloneDeep';
// import { default as extend } from 'lodash/assignIn';
// import { solver } from '../utils/sudoku';

const initialState = [
    [8, 0, 0, 4, 0, 6, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 4, 0, 0],
    [0, 1, 0, 0, 0, 0, 6, 5, 0],
    [5, 0, 9, 0, 3, 0, 7, 8, 0],
    [0, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 4, 8, 0, 2, 0, 1, 0, 3],
    [0, 5, 2, 0, 0, 0, 0, 9, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 9, 0, 2, 0, 0, 5]
];

export default function(state = cloneDeep(initialState), action) {

    switch (action.type) {
        case 'UPDATE_CELL':
            let {row, col, val} = action.cell;
            let changedRow = [
                ...state[row].slice(0, col),
                val,
                ...state[row].slice(col + 1)
            ]; // Omit using splice since it mutates the state
            return [
                ...state.slice(0, row),
                changedRow,
                ...state.slice(row + 1)
            ];

        default:
            return state;
    }
}

