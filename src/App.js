import React, { Component } from 'react'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch } from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  
  render() {
    return (
      <Layout>
        {/* Switch only loads the first route that matches */}
        <Switch>
          <Route path='/checkout' component={Checkout} />
          {/* Exact only loads this route if it matches the path exactly */}
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    )
  }
}

export default App
