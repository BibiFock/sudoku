import cloneDeep from 'lodash/cloneDeep'

export function thereIsDouble (block) {
    let row = block.filter((cell) => cell > 0)
    let rowUnique = Array.from(new Set(row))

    return (row.length !== rowUnique.length);
}

export function validGrid(grid) {
    let cols = [], blocks = []

    for (let i = 0; i < grid.length; i++) {
        if (thereIsDouble(grid[i])) {
            return false
        }
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0) {
                cols[j] = []
            }
            cols[j].push(grid[i][j]);
            let blockId = Math.floor(i/3)+1 + '/' + Math.floor(j/3)
            if (!blocks[blockId]) {
                blocks[blockId] = []
            }
            blocks[blockId].push(grid[i][j])
        }
    }

    for (let i in cols) {
        if (thereIsDouble(cols[i])) {
            return false;
        }
    }

    for (let i in blocks) {
        if (thereIsDouble(blocks[i])) {
            return false;
        }
    }

    return true
};

export function getForbiddenNumbers(grid, row, col) {
    grid = cloneDeep(grid);
    grid[row][col] = 0
    // find row numbers
    let values = grid[row].filter(val => val > 0)

    // find col numbers
    for (let i = 0; i < grid.length; i++) {
        let value = grid[i][col]
        if (value === 0) {
            continue
        }

        if (values.indexOf(value) === -1) {
            values.push(value)
        }
    };
    // find blocks numbers
    let bCol = Math.floor(col/3)*3
    let bRow = Math.floor(row/3)*3

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let value = grid[bRow + i][ bCol + j]
            if (value === 0) {
                continue
            }

            if (values.indexOf(value) === -1) {
                values.push(value)
            }
        }
    }

    return values
}

export function getAvailableNumbers(grid, row, col) {
    let options = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    getForbiddenNumbers(grid, row, col)
        .sort((a, b) => b-a)
        .forEach(el => options.splice(el-1, 1))

    return options
}

export function solveIt(grid, first) {
    grid = cloneDeep(grid)

    let isChange = false;
    for (var i = 0; i < grid.length; i++) {
        // on récupère l'index le plus proche à remplacer
        let index = grid[i].indexOf(0);
        if (index === -1) {
            continue;
        }
        isChange = true

        let options = getAvailableNumbers(grid, i, index)

        // on y procède de manière subtil :)
        for (let val of options) {
            grid[i][index] = val
            if (!validGrid(grid)) {
                continue
            }

            let state = solveIt(grid, first+1)
            if (state !== false) {
                return state
            }
        }
        // si on est là c'est qu'on a pas trouvé de bonnes valeurs
        // donc on dégage
        break
    }

    if (!isChange)  {
        return grid
    }

    return false;
}

export function createEmptyGrid() {
    let grid = []
    for (var row = 0; row < 9; row++) {
        grid.push([])
        for (var col = 0; col < 9; col++) {
            grid[row].push(0)
        }
    }

    return grid
}

export function getGrid(index) {
    let grids = [
        '076010043000702900090006000000063204460000019105420000000200090004807001910050720',
        '100030590300500020050902638430000000000601000000000087647308050010005009092070003'
    ];

    let grid = createEmptyGrid()

    grids[index].split('').forEach( (cell, i) => {
        grid[Math.floor(i/9)][i%9] = parseInt(cell, 10)
    });

    return grid;
}
