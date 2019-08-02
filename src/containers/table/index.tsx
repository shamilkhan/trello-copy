import React, { Component } from 'react';
import ITable from '../../interfaces/IBlock';
import IBlock from '../../interfaces/IBlock';
import { inject, observer } from 'mobx-react';
import Block from '../block';

interface IProps {
    tableStore?: ITable,
    /**TODO: replace any */
    blockStore?: any
}

@inject('blockStore')
@observer
class Table extends Component<IProps> {
    render() {
        const { tableStore, blockStore } = this.props;
        if (blockStore) {
            const blocks: IBlock[] = blockStore.blocks;
            return blocks.map(block => (
                <Block
                    key={block.id}
                    {...{block}}
                />
            ))
        } else {
            return null;
        }
    }
}

export default Table;