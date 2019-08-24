import React, { Component } from 'react';
import IBlock from '../../interfaces/IBlock';
import { ITaskStore } from '../../state/task';
import BlockComponent from '../../components/block';
import TaskComponent from '../../components/task';
import AddTask from '../../components/add-task/index';
import { inject, observer } from 'mobx-react';
import shortId from 'shortid';
import ITask from '../../interfaces/ITask';


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
            const { addTask, changePlaces } = taskStore;
            const tasks = taskStore.tasks.filter(task => task.blockId === id);
            return (
                <React.Fragment>
                    <BlockComponent
                        {...{ ...block }}
                    />
                    {Array.isArray(tasks) && (tasks.length) && (
                        tasks.map(task => {
                            return (
                                <TaskComponent
                                    key={task.id}
                                    {...{ task, changePlaces }}
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
                </React.Fragment>
            )
        } else {
            return null;
        }
    }
}

export default Block;