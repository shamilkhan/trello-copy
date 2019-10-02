import { observable, action } from 'mobx';
import IBlock from '../interfaces/IBlock';
import { blocks as mockBlocks } from '../mock/';

export interface IBlockStore {
    blocks: IBlock[],
    addNewBlock: Function,
    changePlaces: Function
}

class Block<IBlockStore> {
    @observable
    blocks: IBlock[] = mockBlocks;

    @action
    addNewBlock(block: IBlock) {
        this.blocks.push(block);
    }
    @action
    changePlaces = (firstId: string, secondId: string) => {
        const { blocks } = this;
        const firstBlock = blocks.find(block => block.id === firstId);
        const secondBlock = blocks.find(block => block.id === secondId);
        if (firstBlock && secondBlock) {
            this.blocks = blocks.map(block => {
                if (block === firstBlock) {
                    return secondBlock;
                } else if (block === secondBlock) {
                    return firstBlock;
                } else {
                    return block;
                }
            })
        }
    }
}

export default new Block();