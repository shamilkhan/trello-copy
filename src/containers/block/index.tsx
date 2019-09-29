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

const BlockWrapper = styled.div`
    position: relative;
    width: 250px;
`

interface IProps {
    block: IBlock,
    taskStore?: ITaskStore
}

@inject("taskStore")
@observer
class Block extends Component<IProps> {
    render() {
        const { block, taskStore } = this.props;
        const { id } = block;
        if (taskStore) {
            let { addTask, changePlaces, setActiveTask, tasks, activeTask } = taskStore;
            tasks = tasks.filter(task => task.blockId === id);
            return (
                <BlockWrapper>
                    <BlockComponent
                        {...{ ...block }}
                    />
                    {Array.isArray(tasks) && (tasks.length > 0) ? (
                        tasks.map(task => {
                            return (
                                <TaskComponent
                                    key={task.id}
                                    {...{ id: task.id, task, changePlaces, setActiveTask, activeTask }}
                                />
                            )
                        })
                    ) : (
                            <EmptyPlace {...{ block }} />
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
                </BlockWrapper>
            )
        } else {
            return null;
        }
    }
}

export default Block;