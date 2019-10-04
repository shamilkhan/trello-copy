import React, { Component } from 'react';
import styled from 'styled-components';
import IBlock from '../../interfaces/IBlock';
import { ITaskStore } from '../../state/task';
import BlockComponent from '../../components/block';
import TaskComponent from '../task';
import AddTask from '../../components/add-task/index';
import { inject, observer } from 'mobx-react';
import shortId from 'shortid';
import ITask from '../../interfaces/ITask';
import EmptyPlace from '../../components/empty-place/index';
import { DragSource, DropTarget } from 'react-dnd';
import { IBlockStore } from '../../state/block';

interface IBlockWrapper {
    isDragging: Boolean
}

const BlockWrapper = styled.div<IBlockWrapper>`
    position: relative;
    margin-right: 30px;
    border-radius: 4px;
    overflow: hidden;
`


const HideContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1b2030;
`

const dropTarget = {
    canDrop(props: any, monitor: any) {
        return true;
    },
    hover(props: any, monitor: any, component: any) {
        const { id: hoverId, changePlaces } = props;
        const { id } = monitor.getItem();
        if (typeof changePlaces === "function") {
            changePlaces(hoverId, id);
        }
    },

    drop(props: any, monitor: any, component: any) {
        if (monitor.didDrop()) {
            // If you want, you can check whether some nested
            // target already handled drop
            return
        }

        // Obtain the dragged item
        const item = monitor.getItem()
        return item
    },
}


const cardSource = {
    beginDrag(props: any) {
        const item = { id: props.id };
        return item
    }
}

/**
 * Specifies which props to inject into your component.
 */
function dragCollect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        // connectDropTarget: connect.dropTargets
    }
}


function collect(connect: any, monitor: any) {
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

interface IProps {
    block: IBlock,
    taskStore?: ITaskStore,
    connectDragSource: Function,
    connectDropTarget: Function,
    isDragging: Boolean
}

@inject("taskStore")
@observer
class Block extends Component<IProps> {
    render() {
        const { block, taskStore, connectDragSource, isDragging, connectDropTarget } = this.props;
        const { id } = block;
        if (taskStore) {
            let { addTask, changePlaces, setActiveTask, tasks, activeTask } = taskStore;
            tasks = tasks.filter(task => task.blockId === id);
            const hasTasks: boolean = Array.isArray(tasks) && !!tasks.length;
            return connectDragSource(
                connectDropTarget(
                    <div>
                        <BlockWrapper isDragging={isDragging}>
                            {hasTasks || (
                                <EmptyPlace {...{ block }} />
                            )}
                            <BlockComponent
                                {...{ block }}
                            />
                            {hasTasks && (
                                tasks.map(task => {
                                    return (
                                        <TaskComponent
                                            key={task.id}
                                            {...{ id: task.id, task, changePlaces, setActiveTask, activeTask }}
                                        />
                                    )
                                })
                            )}
                            <AddTask
                                callBack={(value) => {
                                    const task: ITask = {
                                        id: shortId.generate(),
                                        value,
                                        blockId: id
                                    }
                                    addTask(task);
                                }}
                            />
                            {isDragging && (<HideContent />)}
                        </BlockWrapper>
                    </div>)
            )
        } else {
            return null;
        }
    }
}

const WithDrag = DragSource("block", cardSource, dragCollect)(Block);

export default DropTarget("block", dropTarget, collect)(WithDrag);