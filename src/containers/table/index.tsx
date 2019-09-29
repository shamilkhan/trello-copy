import React, { Component } from 'react';
import ITable from '../../interfaces/IBlock';
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
            const { blocks } = blockStore;
            if (Array.isArray(blocks) && blocks.length) {
                return (
                    <TableComponent>
                        {blocks.map(block => (
                            <Block
                                key={block.id}
                                {...{ block }}
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