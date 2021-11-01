export default class Board {
    boardContainer = undefined
    board = undefined
    
    element = undefined
    elementProperties = undefined
    additionalElementData = undefined

    constructor(
        boardContainer,
        boardContainerSize,
        boardSize,
        elementProperties,
        // Optional.
        {
            boardColor,
            spacing,
            boardData,
            additionalElementData
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

        this.additionalElementData = additionalElementData || {  }

        let elements = 0
        this.board.boardData.forEach(column =>
            column.filter(element => {
                if(elementProperties[element].additionalData != undefined) this.additionalElementData[elements] = elementProperties[element].additionalData
                elements ++
            }))
        
        this.additionalElementData = JSON.parse(JSON.stringify(this.additionalElementData))

        this.element = {
            size: {
                x: boardContainerSize.x / boardSize.x - spacing.x,
                y: boardContainerSize.y / boardSize.y - spacing.y
            }
        }

        this.elementProperties = elementProperties
    }
}