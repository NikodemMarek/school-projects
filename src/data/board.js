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
            spacing,
            boardData
        }
    ) {
        this.boardContainer = {
            container: boardContainer,
            size: boardContainerSize,
            color: boardColor || 'black',
            spacing: spacing || { x: 0, y: 0 }
        }
        this.board = {
            size: boardSize,
            boardData: boardData || JSON.parse(JSON.stringify(Array(boardSize.x).fill(Array(boardSize.y).fill(0))))
        }

        this.element = {
            size: {
                x: boardContainerSize.x / boardSize.x - spacing.x,
                y: boardContainerSize.y / boardSize.y - spacing.y
            }
        }

        this.elementProperties = elementProperties
    }
}