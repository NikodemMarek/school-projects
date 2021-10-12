/**
 * Position on 2d grid.
 * 
 * @typedef {
 *      x: number,
 *      y: number
 * } Position
 */

/**
 * Show a board.
 *
 * @param {Element} container - a container for board
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {Position} space - spacing around elements
 * @param {Position} size - length of edges of the ship
 * @param {string} shipColor - color of the ships
 * @param {string} emptyColor - color of the empty elements
 */
function drawBoard(container, board, space, size, shipColor, emptyColor) {
    container.style.borderTop = space.x + 'px solid'
    container.style.borderBottom = space.x + 'px solid'
    container.style.borderLeft = space.y + 'px solid'
    container.style.borderRight = space.y + 'px solid'
    board.forEach((column, y) => column.forEach((field, x) => drawElement(container, { x: x, y: y }, space, size, (field == 1 ? shipColor : emptyColor))))
}
/**
 * Show board element in container in a provided position.
 *
 * @param {Element} container - a container for board
 * @param {Position} position - position of the element
 * @param {Position} space - spacing around elements
 * @param {Position} size - length of edges of the element
 * @param {string} color - color of the element
 */
function drawElement(container, position, space, size, color) {
    const element = document.createElement('div')
    element.style.position = 'absolute'
    element.style.top = position.x * size.x + space.x + 'px'
    element.style.left = position.y * size.y + space.y + 'px'
    element.style.height = size.x - space.x * 2 + 'px'
    element.style.width = size.y - space.y * 2 + 'px'
    element.style.backgroundColor = color

    container.appendChild(element)
}

/**
 * Create a board and place all requested ships on it.
 *
 * @param {Position} dimensions - dimensions of the board to create
 * @param {Array.<{ size: number, quantity: number }>} ships - ships to place
 * @return {Array.<Array.<number>>} table representing a board
 */
function placeShips(dimensions, ships) {
    // Create a array of provided size x, and fill it with arrays of provided size y, to create board.
    const board = Array(dimensions.x)
    for(let i = 0; i < board.length; i ++) board[i] = Array(dimensions.y).fill(0)

    for(let i = 0; i < ships.length; i++) {
        for(let j = 0; j < ships[i].quantity; j ++) {
            const shipPositions = placeShip(board, ships[i].size)
            shipPositions.forEach(shipPosition => board[shipPosition.x][shipPosition.y] = 1)
        }
    }

    return board
}
/**
 * Place the ship in a randop position on the board.
 * Check if the position is occupied by another ship.
 * If true repeat the process, else return position.
 *
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {number} size - size of the ship
 * @return {Array.<Position>} positions of the ship
 */
function placeShip(board, size) {
    let positions = [ { x: -1, y: -1 } ]
    
    do {
        positions = Array(size) 
        positions[0] = {
            x: Math.floor(Math.random() * board.length),
            y: Math.floor(Math.random() * board[0].length)
        }

        if(size > 1) {
            const direction = Math.random() < 0.5 // true - vertical, false - horizontal

            for(let i = 1; i < size; i ++) {
                positions[i] = {
                    x: positions[0].x + (direction? i: 0),
                    y: positions[0].y + (direction? 0: i)
                }
            }
        }
    } while(!canPlaceShip(board, positions))

    return positions
}

/**
 * Check if any of positions is occupied by other ships.
 * Check if area around the ship is not occupied by othe ships.
 *
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {Position} position - positions of the ship on the board
 * @return {boolean} can ship be placed
 */
function canPlaceShip(board, positons) {
    return positons.every(position => {
        return isOnBoard(board, position) &&
            isNotShip(board, { x: position.x - 1, y: position.y - 1 }) &&
            isNotShip(board, { x: position.x - 1, y: position.y }) &&
            isNotShip(board, { x: position.x - 1, y: position.y + 1 }) &&
            isNotShip(board, { x: position.x, y: position.y - 1 }) &&
            isNotShip(board, { x: position.x, y: position.y }) &&
            isNotShip(board, { x: position.x, y: position.y + 1 }) &&
            isNotShip(board, { x: position.x + 1, y: position.y - 1 }) &&
            isNotShip(board, { x: position.x + 1, y: position.y }) &&
            isNotShip(board, { x: position.x + 1, y: position.y + 1 })
    })
}

/**
 * Check if the given position on board is occupied by a ship.
 *
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {Position} position - position on the board
 * @return {boolean} is there a ship in given position
 */
function isShip(board, position) { return isOnBoard(board, position) && board[position.x][position.y] == 1 }
/**
 * Check if the given position on board is not occupied by a ship.
 *
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {Position} position - position on the board
 * @return {boolean} is there not a ship in given position
 */
function isNotShip(board, position) { return !isOnBoard(board, position) || (isOnBoard(board, position) && board[position.x][position.y] == 0) }
/**
 * Check if the given position is inside board boundaries.
 *
 * @param {Array.<Array.<number>>} board - table representing a board
 * @param {Position} position - position on the board
 * @return {boolean} is position on the board
 */
function isOnBoard(board, position) {
    return position.x >= 0 && position.y >= 0 &&
        position.x < board.length && position.y < board[0].length
}

// Initialize generator.
function init() {
    /**
     * Size of the container (absoulte).
     * 
     * @const {Position}
     */
    const containerSize = { x: 500, y: 500 }
    /**
     * Size of the board (relative).
     * 
     * @const {Position}
     */
    const boardDimensions = { x: 10, y: 10 }
    /**
     * Size of ships (absoulte).
     * 
     * @const {Position}
     */
    const elementSize = { x: containerSize.x / boardDimensions.x, y: containerSize.y / boardDimensions.y }
    /**
     * Spacing between elements on board.
     * 
     * @const {Position}
     */
    const space = { x: 1, y: 1 }

    /**
     * Color of ships.
     * 
     * @type {string}
     */
    const shipColor = 'black'
    /**
     * Color of empty elements on a board.
     * 
     * @type {string}
     */
     const emptyColor = 'white'

    /**
     * Size and number of ships.
     * 
     * @type {Array.<{ size: number, quantity: number }>}
     */
    const ships = [
        { size: 1, quantity: 4},
        { size: 2, quantity: 3},
        { size: 3, quantity: 2},
        { size: 4, quantity: 1}
    ]

    // Generate a board with provided ships.
    const board = placeShips(boardDimensions, ships)

    // Container for board.
    const availableShipsContainer = document.getElementsByClassName('board')[0]

    drawBoard(availableShipsContainer, board, space, elementSize, shipColor, emptyColor)
}

init()