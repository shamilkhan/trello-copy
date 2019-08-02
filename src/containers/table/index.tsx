import React, { Component } from 'react';
import ITable from '../../interfaces/IBlock';
import IBlock from '../../interfaces/IBlock';
import { inject, observer } from 'mobx-react';
import TableComponent from '../../components/table';
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
        const { blockStore } = this.props;
        if (blockStore) {
            const blocks: IBlock[] = blockStore.blocks;
            return (
                <TableComponent>
                    {blocks.map(block => (
                        <Block
                            key={block.id}
                            {...{ block }}
                        />
                    ))}
                </TableComponent>
            )
        } else {
            return null;
        }
    }
}

export default Table;