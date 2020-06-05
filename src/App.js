import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* BurgerBuilder can be a self closing component because dont need to wrap anything*/}
          <BurgerBuilder />
          <p>Test</p>
        </Layout>
      </div>
    );
  }
}

export default App;
