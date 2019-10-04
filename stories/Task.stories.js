import React from 'react';
import { action } from '@storybook/addon-actions';
import Task from '../src/components/task';

export default {
    title: 'Task',
};

const task = {
    id: 1223,
    value: "Task Value"
}

export const emoji = () => (
    <Task {...{ task }} />
);
