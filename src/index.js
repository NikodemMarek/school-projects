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
        class: 'e1',
        content: `<div style='background-color: blue; width: 100%; height: 100%'></div>`,
        eventListeners: [
            {
                event: 'click',
                perform: (element, event) => alert('he clicked me')
            }
        ]
    },
    2: {
        class: 'e0',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event) => {
                    element.style.backgroundColor = 'white'
                }
            }
        ]
    }
}
const spacing = {
    x: 1,
    y: 1
}
const boardData = [
    [ 0, 0, 1, 0, 0 ],
    [ 2, 1, 2, 0, 1 ],
    [ 0, 0, 1, 0, 0 ],
    [ 1, 2, 0, 1, 0 ],
    [ 1, 0, 0, 1, 2 ]
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