import React, { Component } from 'react'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { Route, Switch } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/'

class App extends Component {
  componentDidMount() {
    this.props.onAuthStateCheck()
  }
  
  render() {
    return (
      <Layout>
        {/* Switch only loads the first route that matches */}
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          {/* Exact only loads this route if it matches the path exactly */}
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStateCheck: () => dispatch(actionTypes.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App)
