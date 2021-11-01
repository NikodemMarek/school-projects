export default function draw(board) {
    board.boardContainer.container.innerHTML = ''
    board.boardContainer.container.style.width = board.boardContainer.size.x + 'px'
    board.boardContainer.container.style.height = board.boardContainer.size.y + 'px'
    board.boardContainer.container.style.backgroundColor = board.boardContainer.color

    board.boardContainer.container.style.paddingTop = board.boardContainer.spacing.y + 'px'
    board.boardContainer.container.style.paddingLeft = board.boardContainer.spacing.y + 'px'

    board.board.boardData.forEach(column => {
        const columnContainer = document.createElement('div')
        columnContainer.style.marginRight = board.boardContainer.spacing.y + 'px'
        columnContainer.style.float = 'left'

        column.forEach(index => drawElement(columnContainer, board.element, board.elementProperties[index], board.boardContainer.spacing))

        board.boardContainer.container.appendChild(columnContainer)
    })
}
export function drawElement(container, element, elementProperties, spacing) {
    const newElement = document.createElement('div')
    newElement.classList.add(elementProperties.class)
    newElement.style.width = element.size.x + 'px'
    newElement.style.height = element.size.y + 'px'
    newElement.style.marginBottom = spacing.y + 'px'
    
    newElement.innerHTML = elementProperties.content || ''

    container.appendChild(newElement)
}