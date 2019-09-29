import './index.css';
import React from 'react';
import styled from 'styled-components';
import TaskDnD from '../../hoc/task-dnd';
import { inject, observer } from 'mobx-react';
import IBlock from '../../interfaces/IBlock';
import { ITaskStore } from '../../state/task';

interface IProps {
    block: IBlock,
    taskStore?: ITaskStore
}

@inject("taskStore")
@observer
class EmptyPlace extends React.Component<IProps> {
    render() {
        const { block, taskStore } = this.props;
        return (
            <TaskDnD
                changePlaces={function (taskId: string) {
                    if (taskStore) {
                        taskStore.changeBlockId(taskId, block.id);
                    }
                }}>
                <div className="empty-place" />
            </TaskDnD>
        );
    }
}

export default EmptyPlace;