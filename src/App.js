import React, { Component } from 'react'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/'

class App extends Component {
  componentDidMount() {
    this.props.onAuthStateCheck()
  }
  
  render() {
    let routes
    
    // Dynamically loading routes based on auth status
    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          {/* Switch only loads the first route that matches */}
          <Route path='/auth' component={Auth} />
          {/* Exact only loads this route if it matches the path exactly */}
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStateCheck: () => dispatch(actionTypes.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
