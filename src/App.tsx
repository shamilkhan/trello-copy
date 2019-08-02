import React from 'react';
import { Provider } from 'mobx-react';
import blockStore from './state/block';
import taskStore from './state/task';
import Table from './containers/table';
import Typography from '@material-ui/core/Typography';

const containerStyle = {
  backgroundColor: '#222222',
  height: '100vh',
  width: '100vw'
}

const stores = {
  blockStore,
  taskStore
}

function App() {
  return (
    <Provider {...stores}>
      <Typography component="div" style={containerStyle}>
        {/* <Table /> */}
        &#128540;
      </Typography>
    </Provider>
  );
}

export default App;
