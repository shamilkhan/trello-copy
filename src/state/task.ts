import { observable, action, computed } from 'mobx';
import ITask from '../interfaces/ITask';
import { tasks as mockTasks } from '../mock';

export interface ITaskStore {
    tasks: ITask[],
    addTask: Function
}

class Task<ITaskStore> {
    @observable
    tasks: ITask[] = mockTasks;

    @action
    addTask(task: ITask) {
        this.tasks.push(task)
    }
}

export default new Task();