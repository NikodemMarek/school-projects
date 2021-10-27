export default class Board {
    boardContainer = undefined
    board = undefined
    
    element = undefined
    elementProperties = undefined

    constructor(
        boardContainer,
        boardContainerSize,
        boardSize,
        elementProperties,
        // Optional.
        {
            boardColor,
            boardData
        }
    ) {
        this.boardContainer = {
            container: boardContainer,
            size: boardContainerSize,
            color: boardColor || 'black'
        }
        this.board = {
            size: boardSize,
            boardData: boardData || JSON.parse(JSON.stringify(Array(boardSize.x).fill(Array(boardSize.y).fill(0))))
        }

        this.element = {
            size: {
                x: boardContainerSize.x / boardSize.x,
                y: boardContainerSize.y / boardSize.y
            }
        }

        this.elementProperties = elementProperties
    }
}