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

const onCoveredClick = (element, event, elementData) => {
        board.setValue(elementData.elementPosition, board.valueAt(elementData.elementPosition) + 12)
        drawBoard(board)
    }

const elementProperties = {
    0: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => {
                    if(gameState == GameState.GAME) {
                        
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

                        board.applyFor(position => {
                            const bombsAround = [
                                { x: position.x - 1, y: position.y - 1 },
                                { x: position.x - 1, y: position.y },
                                { x: position.x - 1, y: position.y + 1 },
                                { x: position.x, y: position.y - 1 },
                                { x: position.x, y: position.y + 1 },
                                { x: position.x + 1, y: position.y - 1 },
                                { x: position.x + 1, y: position.y },
                                { x: position.x + 1, y: position.y + 1 }
                            ].reduce((bombs, position) => board.isValue(position, 10)? bombs + 1: bombs, 0)
                    
                            board.setValue(position, bombsAround == 0? 0: bombsAround)
                        }, 0)
                    
                        drawBoard(board)
                    }
                }
            }
        ],
    },
    1: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    2: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    3: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    4: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    5: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    6: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    7: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    8: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    9: {
        class: 'covered',
        eventListeners: [
            {
                event: 'click',
                perform: (element, event, elementData) => onCoveredClick(element, event, elementData)
            }
        ]
    },
    10: {
        class: 'covered',
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
    // Uncovered elements.
    12: {
        class: 'uncovered'
    },
    13: {
        class: 'uncovered',
        content: `<span style='color: blue;'>1</span>`
    },
    14: {
        class: 'uncovered',
        content: `<span style='color: green;'>2</span>`
    },
    15: {
        class: 'uncovered',
        content: `<span style='color: red;'>3</span>`
    },
    16: {
        class: 'uncovered',
        content: `<span style='color: darkblue;'>4</span>`
    },
    17: {
        class: 'uncovered',
        content: `<span style='color: darkred;'>5</span>`
    },
    18: {
        class: 'uncovered',
        content: `<span style='color: lightseagreen;'>6</span>`
    },
    19: {
        class: 'uncovered',
        content: `<span style='color: black;'>7</span>`
    },
    20: {
        class: 'uncovered',
        content: `<span style='color: gray;'>8</span>`
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