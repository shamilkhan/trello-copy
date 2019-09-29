import { observable, action, computed } from 'mobx';
import ITask from '../interfaces/ITask';
import { tasks as mockTasks, blocks } from '../mock';

export interface ITaskStore {
    tasks: ITask[],
    activeTask: ITask | null,
    addTask: (task: ITask) => void,
    changePlaces: (firstId: number, secondId: number) => void,
    changeValue: (value: string) => void,
    setActiveTask: (task: ITask) => void,
    changeBlockId: (taskId: string, blockId: string) => void,
    resetActiveTask: () => void
}

class Task<ITaskStore> {
    @observable
    tasks: ITask[] = mockTasks;
    /**For popup */
    @observable
    activeTask: ITask | null = null;

    @action
    addTask = (task: ITask) => {
        this.tasks.push(task)
    }

    @action
    changePlaces = (firstId: string, secondId: string) => {
        const { tasks } = this;
        const firstTask = tasks.find(task => task.id === firstId);
        const secondTask = tasks.find(task => task.id === secondId);
        /**if from one block */
        if (firstTask && secondTask) {
            if (firstTask.blockId === secondTask.blockId) {
                this.tasks = tasks.map(task => {
                    const { id } = task;
                    if (id === firstId) {
                        return { ...secondTask }
                    } else if (id === secondId) {
                        return { ...firstTask }
                    }
                    return task;
                })
            }
            /**Move from one block to another */
            else {
                this.tasks = tasks.map(task => {
                    const { id } = task;
                    if (id === firstId) {
                        return {
                            ...task,
                            blockId: secondTask.blockId
                        }
                    }
                    return task;
                });
            }
        }
    }

    @action
    changeValue = (value: string) => {
        const { activeTask } = this;
        if (activeTask) {
            activeTask.value = value
        }
    }

    @action
    setActiveTask = (task: ITask) => {
        this.activeTask = task;
    }

    @action 
    changeBlockId = (taskId: string, blockId: string) => {
        const currentBlock = this.tasks.find(t => t.id === taskId);
        if(currentBlock) {
            currentBlock.blockId = blockId
        }
    }

    resetActiveTask = () => this.activeTask = null;
}

export default new Task();