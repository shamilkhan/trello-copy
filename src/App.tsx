import React from 'react';
import { Provider } from 'mobx-react';
import blockStore from './state/block';
import taskStore from './state/task';
import Table from './containers/table';


const stores = {
  blockStore,
  taskStore
}

function App() {
  return (
    <Provider {...stores}>
      <Table />
    </Provider>
  );
}

export default App;
