import { observable, action, computed } from 'mobx';
import ITask from '../interfaces/ITask';
import { tasks as mockTasks } from '../mock';

export interface ITaskStore {
    tasks: ITask[],
    addTask: (task: ITask) => void
    changePlaces: (firstId: number, secondId: number) => void
}

class Task<ITaskStore> {
    constructor() {
        this.addTask = this.addTask.bind(this);
        this.changePlaces = this.changePlaces.bind(this);
    }

    @observable
    tasks: ITask[] = mockTasks;

    @action
    addTask(task: ITask) {
        this.tasks.push(task)
    }
    @action
    changePlaces(firstId: string, secondId: string) {
        const {tasks} = this;
        const firstTask = tasks.find(task => task.id === firstId);
        const secondTask = tasks.find(task => task.id === secondId);
        if(firstTask && secondTask) {
            this.tasks = tasks.map(task => {
                const {id} = task;
                if(id === firstId) {
                    return {
                        ...task,
                        value: secondTask.value
                    }
                }else if(id === secondId) {
                    return {
                        ...task,
                        value: firstTask.value
                    }
                }
                return task;
            })
        }
    }
}

export default new Task();