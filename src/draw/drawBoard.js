export default function draw(board) {
    board.boardContainer.container.innerHTML = ''
    board.boardContainer.container.style.width = board.boardContainer.size.x + 'px'
    board.boardContainer.container.style.height = board.boardContainer.size.y + 'px'
    board.boardContainer.container.style.backgroundColor = board.boardContainer.color

    board.boardContainer.container.style.paddingTop = board.boardContainer.spacing.y + 'px'
    board.boardContainer.container.style.paddingLeft = board.boardContainer.spacing.x + 'px'

    let elements = 0
    board.board.boardData.forEach(column => {
        const columnContainer = document.createElement('div')
        columnContainer.style.marginBottom = board.boardContainer.spacing.y + 'px'
        columnContainer.style.height = board.element.size.y + 'px'

        column.forEach(index => {
            drawElement(
                columnContainer,
                board.element,
                board.boardContainer.spacing,
                board.elementProperties[index],
                board.additionalElementData[elements]
            )
            elements ++
        })

        board.boardContainer.container.appendChild(columnContainer)
    })
}
export function drawElement(
    container,
    element,
    spacing,
    elementProperties,
    additionalElementData
) {
    const newElement = document.createElement('div')
    newElement.classList.add(elementProperties.class)
    newElement.style.width = element.size.x + 'px'
    newElement.style.height = element.size.y + 'px'
    newElement.style.marginRight = spacing.x + 'px'
    newElement.style.float = 'left'
    
    newElement.innerHTML = elementProperties.content || ''

    if('eventListeners' in elementProperties) elementProperties.eventListeners.forEach(eventListener =>
        newElement.addEventListener(eventListener.event, event => {
            event.preventDefault()
            eventListener.perform(newElement, event, additionalElementData)
            return false
        }, false))

    container.appendChild(newElement)
}