import React, { Component } from 'react';
import IBlock from '../../interfaces/IBlock';
import { ITaskStore } from '../../state/task';
import BlockComponent from '../../components/block';
import TaskComponent from '../../components/task';
import { inject, observer } from 'mobx-react';


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
                                    {...{ ...task }}
                                />
                            )
                        })
                    )}
                </React.Fragment>
            )
        }else {
            return null;
        }
    }
}

export default Block;