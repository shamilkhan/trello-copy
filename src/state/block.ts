import { observable, action } from 'mobx';
import IBlock from '../interfaces/IBlock';
import { blocks as mockBlocks} from '../mock/';

export interface IBlockStore {
    blocks: IBlock[],
    addNewBlock: Function,
}

class Block<IBlockStore> {
    @observable
    blocks: IBlock[] = mockBlocks;

    @action
    addNewBlock(block: IBlock) {
        this.blocks.push(block);
    }
}

export default new Block();