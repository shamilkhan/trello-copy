import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { ITaskStore } from '../../state/task';

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.1);
`

const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 500px;
    height: 300px;
    background-color: #fff;
`

const TopWrapper = styled.div`
    display: flex;

`

const Input = styled.input`
    height: 35px;
    width: 100%;
`


const CloseIcon = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
`

interface IProps {
    taskStore?: ITaskStore
}
@inject("taskStore")
@observer
class PopupComponent extends Component<IProps> {
    render() {
        const { taskStore } = this.props;
        if (taskStore) {
            const { activeTask: task, resetActiveTask } = taskStore;
            if (task) {
                const { changeValue } = taskStore;
                return ReactDOM.createPortal(
                    <Wrapper>
                        <Popup>
                            <TopWrapper>
                                <Input
                                    {...{ value: task.value }}
                                    onChange={ev => changeValue(ev.target.value)}
                                />
                                <CloseIcon onClick={resetActiveTask} />
                            </TopWrapper>
                        </Popup>
                    </Wrapper>,
                    document.body
                )
            }
        }
        return null;
    }
}


export default PopupComponent;