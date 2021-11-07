import drawBoard from './draw/drawBoard.js'
import Board from './data/board.js'

const GameState = Object.freeze({
    START: 0,
    GAME: 1,
    END: 2
})
let gameState = GameState.START

const boardContainer = document.getElementsByClassName('board')[0]
const boardContainerSize = {
    x: 250,
    y: 250
}
const boardSize = {
    x: 9,
    y: 9
}

const spaceAroundStart = {
    x: 1,
    y: 1
}

const elementProperties = {
    0: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => {
                    if(gameState == GameState.GAME) {
                        const bombsAround = [
                            { x: elementData.elementPosition.x - 1, y: elementData.elementPosition.y - 1 },
                            { x: elementData.elementPosition.x - 1, y: elementData.elementPosition.y },
                            { x: elementData.elementPosition.x - 1, y: elementData.elementPosition.y + 1 },
                            { x: elementData.elementPosition.x, y: elementData.elementPosition.y - 1 },
                            { x: elementData.elementPosition.x, y: elementData.elementPosition.y + 1 },
                            { x: elementData.elementPosition.x + 1, y: elementData.elementPosition.y - 1 },
                            { x: elementData.elementPosition.x + 1, y: elementData.elementPosition.y },
                            { x: elementData.elementPosition.x + 1, y: elementData.elementPosition.y + 1 }
                        ].reduce((bombs, position) => board.isValue(position, 10)? bombs + 1: bombs, 0)

                        board.setValue(elementData.elementPosition, bombsAround == 0? 12: bombsAround)
                        
                        drawBoard(board)
                    } else if(gameState == GameState.START) {
                        gameState = GameState.GAME

                        placeBombs(20, board,
                            {
                                from: {
                                    x: elementData.elementPosition.x - spaceAroundStart.x,
                                    y: elementData.elementPosition.y - spaceAroundStart.y
                                },
                                to: {
                                    x: elementData.elementPosition.x + spaceAroundStart.x,
                                    y: elementData.elementPosition.y + spaceAroundStart.y
                                }
                            }
                        )
                        drawBoard(board)
                    }
                }
            }
        ],
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
        content: `<span style='color: black;'>o</span>`,
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => gameOver(board)
            }
        ],
    },
    11: {
        class: 'bombExploded',
        content: `<span style='color: black;'>o</span>`
    },
    12: {
        class: 'uncovered'
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

function placeBombs(bombsQuantity, board, ... exclude) { for(let i = 0; i < bombsQuantity; i++) placeBomb(board, ... exclude) }
function placeBomb(board, ... exclude) {
    while(true) {
        const position = {
            x: Math.floor(Math.random() * board.board.size.x),
            y: Math.floor(Math.random() * board.board.size.y)
        }

        if(isNotInExcluded(position, ... exclude) && board.isValue(position, 0)) return board.setValue(position, 10)
    }
}
function isNotInExcluded(position, ... exclude) { return exclude.every(range => position.x < range.from.x || position.y < range.from.y || position.x > range.to.x || position.y > range.to.y) }

function gameOver(board) {
    gameState = GameState.END

    board.setAll(11, 10)
    drawBoard(board)
}

function init() {
    drawBoard(board)
}

init()