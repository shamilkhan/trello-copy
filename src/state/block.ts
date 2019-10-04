import { observable, action, IObservableArray } from 'mobx';
import IBlock from '../interfaces/IBlock';
import { blocks as mockBlocks } from '../mock/';
import { moveItem } from 'mobx-utils';

export interface IBlockStore {
    blocks: IObservableArray<IBlock>,
    addNewBlock: Function,
    changePlaces: Function
}

class Block<IBlockStore> {
    blocks: IObservableArray<IBlock> = observable.array(mockBlocks);

    @action
    addNewBlock(block: IBlock) {
        this.blocks.push(block);
    }

    @action
    changePlaces = (firstId: string, secondId: string) => {
        const { blocks } = this;
        const firstIndex = blocks.findIndex(block => block.id === firstId);
        const secondIndex = blocks.findIndex(block => block.id === secondId);
        if (firstIndex > -1 && secondIndex > -1) {
            moveItem(blocks, firstIndex, secondIndex)
        }
    }
}



export default new Block();