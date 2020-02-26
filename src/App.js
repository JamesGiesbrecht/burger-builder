import React, { Component, Suspense } from 'react'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Spinner from './components/UI/Spinner/Spinner'
import Checkout from './containers/Checkout/Checkout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/'

const LazyOrders = React.lazy(() => import('./containers/Orders/Orders'))
const LazyAuth = React.lazy(() => import('./containers/Auth/Auth'))

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
          <Route path='/orders' render={() => <Suspense fallback={<Spinner />}><LazyOrders /></Suspense>} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' render={() => <Suspense fallback={<Spinner />}><LazyAuth /></Suspense>} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          {/* Switch only loads the first route that matches */}
          <Route path='/auth' render={() => <Suspense fallback={<Spinner />}><LazyAuth /></Suspense>} />
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
