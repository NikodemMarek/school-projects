import drawBoard from './draw/drawBoard.js'
import Board from './data/board.js'

// Dummy code.
const boardContainer = document.getElementsByClassName('board')[0]
const boardContainerSize = {
    x: 250,
    y: 250
}
const boardSize = {
    x: 5,
    y: 5
}
const elementProperties = {
    0: {
        class: 'e0'
    },
    1: {
        class: 'e1'
    }
}
const spacing = {
    x: 1,
    y: 1
}
const boardData = [
    [ 0, 0, 1, 0, 0 ],
    [ 0, 1, 0, 0, 1 ],
    [ 0, 0, 1, 0, 0 ],
    [ 1, 0, 0, 1, 0 ],
    [ 1, 0, 0, 1, 0 ]
]

const board = new Board(
    boardContainer,
    boardContainerSize,
    boardSize,
    elementProperties,
    {
        spacing: spacing,
        boardData: boardData,
        boardColor: 'red'
    }
)

drawBoard(board)