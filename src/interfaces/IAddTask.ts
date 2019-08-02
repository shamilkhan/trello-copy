import ITask from './ITask';

export default interface IAddTask {
    (newTask: ITask): void
}