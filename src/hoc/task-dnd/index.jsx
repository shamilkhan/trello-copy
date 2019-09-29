import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card',
}


const dropTarget = {
  canDrop(props, monitor) {
    return true;
  },
  hover(props, monitor, component) {
    const {id: hoverId, changePlaces} = props;
    const {id } = monitor.getItem();
    if(hoverId !== id) {
      changePlaces(id, hoverId);
    }
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return
    }

    // Obtain the dragged item
    const item = monitor.getItem()
    return item
    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true }
  },
}


function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
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
function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    // connectDropTarget: connect.dropTargets
  }
}

function Card(props) {
  // Your component receives its own props as usual
  const { id } = props
  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource, connectDropTarget } = props;
  return connectDragSource(
    connectDropTarget(
      <div>
        {React.cloneElement(props.children, {isDragging})}
      </div>
    ),
  )
}

const WithDragSource = DragSource(Types.CARD, cardSource, dragCollect)(Card);
// Export the wrapped version
export default DropTarget(Types.CARD, dropTarget, collect)(WithDragSource);
