import React from 'react';

import { Provider } from 'react-redux';
import store from './src/store/store';
import Navigators from './src/navigation/Navigators';

const App = () => {

  return (
    <Provider store={store}>
      <Navigators />
    </Provider>
  );
};

export default App;
