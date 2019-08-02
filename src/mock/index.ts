import shortId from 'shortid';
import IBlock from '../interfaces/IBlock';
import ITask from '../interfaces/ITask';

const reactId: string = shortId.generate();
const jsId: string = shortId.generate();

export const blocks: Array<IBlock> = [
    {
        id: reactId,
        name: "React",
    },
    {
        id: jsId,
        name: "JS",
    }
]

const learnDnd: ITask = {
    id: shortId.generate(),
    blockId: reactId,
    value: "Leran react D'n'd",
}

const learnMobX: ITask = {
    id: shortId.generate(),
    blockId: reactId,
    value: 'Learn and Practice with mob X',
}

const practiceWithJs: ITask = {
    id: shortId.generate(),
    blockId: jsId,
    value: "use generators",
}

export const tasks: Array<ITask> = [
    learnDnd,
    learnMobX,
    practiceWithJs
]

