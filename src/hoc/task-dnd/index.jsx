import React from 'react'
import { DragSource } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card',
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
   console.log(connect);
    return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function Card(props) {
  // Your component receives its own props as usual
  const { id } = props

  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource } = props
  console.log(isDragging);
  return connectDragSource(
    <div>
     {isDragging || props.children}
    </div>,
  )
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Card)