import React from 'react';
import TaskDnD from '../../hoc/task-dnd';

function EmptyPlace() {
    return(
        <TaskDnD changePlaces={function() {
        }}>
            <div>
                empty place
            </div>
        </TaskDnD>
    );
}

export default EmptyPlace;