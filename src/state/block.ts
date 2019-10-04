import { observable, action, IObservableArray } from 'mobx';
import IBlock from '../interfaces/IBlock';
import { blocks as mockBlocks, blocks } from '../mock/';
import { moveItem } from 'mobx-utils';
import shortid from 'shortid';

export interface IBlockStore {
    blocks: IObservableArray<IBlock>,
    addNewBlock: Function,
    changePlaces: Function
}

class Block<IBlockStore> {
    blocks: IObservableArray<IBlock> = observable.array(mockBlocks);

    @action.bound
    addNewBlock(blockName: string) {
        const block: IBlock = {
            id: shortid.generate(),
            name: blockName
        }
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