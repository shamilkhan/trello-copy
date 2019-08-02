import React from 'react';
import IBlock from '../../interfaces/IBlock';


export default function(block: IBlock) {
    const {id, name} = block;
    return (
        <div>
            {id} {name}
        </div>
    )
}