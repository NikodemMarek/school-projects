export default function draw(board) {
    board.boardContainer.container.innerHTML = ''
    board.boardContainer.container.style.width = board.boardContainer.size.x + 'px'
    board.boardContainer.container.style.height = board.boardContainer.size.y + 'px'
    board.boardContainer.container.style.backgroundColor = board.boardContainer.color
    board.boardContainer.container.style.paddingHorizontal = board.boardContainer.spacing.x
    board.boardContainer.container.style.verticalpadding = board.boardContainer.spacing.y

    board.board.boardData.forEach(column => {
        const columnContainer = document.createElement('div')
        columnContainer.style.width = board.element.x
        columnContainer.style.height = board.boardContainer.y
        columnContainer.style.float = 'left'

        column.forEach(index => drawElement(columnContainer, board.element, board.elementProperties[index]))

        board.boardContainer.container.appendChild(columnContainer)
    })
}
export function drawElement(container, element, elementProperties) {
    const newElement = document.createElement('div')
    newElement.classList.add(elementProperties.class)
    newElement.style.width = element.size.x + 'px'
    newElement.style.height = element.size.y + 'px'
    
    newElement.innerHTML = elementProperties.content || ''

    container.appendChild(newElement)
}