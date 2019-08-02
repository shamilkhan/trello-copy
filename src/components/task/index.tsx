import React from 'react';
import ITask from '../../interfaces/ITask';

export default function (task: ITask) {
    const {id, value} = task;
    return (
        <div>
            {value}
        </div>
    )
}
