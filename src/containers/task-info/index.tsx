import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ITaskStore } from '../../state/task';

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
`
interface IProps {
    taskStore?: ITaskStore
}

@inject("taskStore")
@observer
class TaskInfo extends React.Component<IProps> {
    render() {
        const { taskStore } = this.props;
        if (taskStore) {
            const { activeTask } = taskStore;
            if(activeTask) {
                const {value} = activeTask;
                return (
                    <Wrapper>
                        {value}
                    </Wrapper>
                )
            }
        } 
        return null;
    }
}

export default TaskInfo;