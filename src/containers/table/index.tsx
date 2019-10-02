import React, { Component } from 'react';
import ITable from '../../interfaces/IBlock';
import { inject, observer } from 'mobx-react';
import TableComponent from '../../components/table';
import Block from '../block';
import { IBlockStore } from '../../state/block';

interface IProps {
    tableStore?: ITable,
    blockStore?: IBlockStore
}

@inject('blockStore')
@observer
class Table extends Component<IProps> {
    render() {
        const { blockStore } = this.props;
        if (blockStore) {
            const { blocks, changePlaces } = blockStore;
            if (Array.isArray(blocks) && blocks.length) {
                return (
                    <TableComponent>
                        {blocks.map(block => (
                            <Block
                                key={block.id}
                                {...{ block, id: block.id, changePlaces }}
                            />
                        ))}
                    </TableComponent>
                );
            }
        }
        return null;
    }
}

export default Table;