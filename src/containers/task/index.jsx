import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const TaskElem = styled.div`
    width: 180px;
    background-color: ${props => props.isDragging ? "#1b2030" : "#333c57"};
    color: ${props => props.isDragging ? "transparent" : "#878ea9"};
    margin-top: 12px;
    padding: 18px;
    border-radius: 5px;
    cursor: pointer;
`

const useStyles = makeStyles(theme => ({
    paper: {
        width: 180,
        height: 40,
        backgroundColor: "#333c57",
        color: "#878ea9",
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    paperDrag: {
        backgroundColor: "red",
    }
}));


// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
    CARD: 'card',
}


const dropTarget = {
    canDrop(props, monitor) {
        // You can disallow drop based on props or item
        const item = monitor.getItem()
        return true;
    },
    hover(props, monitor, component) {
        const { id: hoverId, changePlaces } = props;
        const { id } = monitor.getItem();
        // console.log(id, hoverId, props);s
        console.log(monitor, component, props);
        if (hoverId !== id) {
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
    // console.log(connect);
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        // connectDropTarget: connect.dropTargets
    }
}

function Card(props) {
    const { task, setActiveTask } = props;
    console.log(props);
    const { value } = task;
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource, connectDropTarget } = props;
    return connectDragSource(
        connectDropTarget(
            <div style={{ width: "180px" }}>
                <TaskElem
                    onClick={() => setActiveTask(task)}
                    {...{ isDragging }}
                >
                    {value}
                </TaskElem>
            </div>
        ),
    )
}

const WithDragSource = DragSource(Types.CARD, cardSource, dragCollect)(Card);
// Export the wrapped version
export default DropTarget(Types.CARD, dropTarget, collect)(WithDragSource);


