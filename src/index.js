import drawBoard from './draw/drawBoard.js'
import Board from './data/board.js'

const boardContainer = document.getElementsByClassName('board')[0]
const boardContainerSize = {
    x: 250,
    y: 250
}
const boardSize = {
    x: 9,
    y: 9
}

let elementProperties = {
    0: {
        class: 'covered'
    },
    1: {
        class: 'uncovered',
        content: `<span style='color: blue;'>1</span>`
    },
    2: {
        class: 'uncovered',
        content: `<span style='color: green;'>2</span>`
    },
    3: {
        class: 'uncovered',
        content: `<span style='color: red;'>3</span>`
    },
    4: {
        class: 'uncovered',
        content: `<span style='color: darkblue;'>4</span>`
    },
    5: {
        class: 'uncovered',
        content: `<span style='color: darkred;'>5</span>`
    },
    6: {
        class: 'uncovered',
        content: `<span style='color: lightseagreen;'>6</span>`
    },
    7: {
        class: 'uncovered',
        content: `<span style='color: black;'>7</span>`
    },
    8: {
        class: 'uncovered',
        content: `<span style='color: gray;'>8</span>`
    },
    9: {
        class: 'flag',
        content: `<span style='color: tomato;'>|</span>`
    },
    10: {
        class: 'bomb',
        content: `<span style='color: black;'>o</span>`
    },
    11: {
        class: 'bombExploded',
        content: `<span style='color: black;'>o</span>`
    }
}

const spacing = {
    x: 1,
    y: 1
}
const board = new Board(
    boardContainer,
    boardContainerSize,
    boardSize,
    elementProperties,
    {
        spacing: spacing,
        boardColor: 'black'
    }
)

board.board.boardData[1][1] = 1
board.board.boardData[2][1] = 2
board.board.boardData[3][1] = 3
board.board.boardData[4][1] = 4
board.board.boardData[5][1] = 5
board.board.boardData[6][1] = 6
board.board.boardData[7][1] = 7
board.board.boardData[8][1] = 8

board.board.boardData[2][3] = 9
board.board.boardData[3][3] = 10
board.board.boardData[4][3] = 11

drawBoard(board)