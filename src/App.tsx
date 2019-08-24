import './App.css';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Provider } from 'mobx-react';
import blockStore from './state/block';
import taskStore from './state/task';
import Table from './containers/table';
import TaskInfo from './containers/task-info';

const stores = {
  blockStore,
  taskStore
}

function App() {
  return (
    <Provider {...stores}>
      <DndProvider backend={HTML5Backend}>
        <Table />
        <TaskInfo />
      </DndProvider>
    </Provider>
  );
}

export default App;
