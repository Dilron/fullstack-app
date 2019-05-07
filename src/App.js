import React from 'react';
import NavHeader from './components/NavHeader/NavHeader';
import router from './router';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redDucks/store';

function App() {
  return (
  <Provider store={store}>
    <Router>
      <NavHeader/>
      {router}
    </Router>
  </Provider>
    
  );
}

export default App;
