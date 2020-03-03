import React, { Suspense, useEffect } from 'react'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Spinner from './components/UI/Spinner/Spinner'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionTypes from './store/actions/'

const LazyOrders = React.lazy(() => import('./containers/Orders/Orders'))
const LazyAuth = React.lazy(() => import('./containers/Auth/Auth'))
const LazyCheckout = React.lazy(() => import('./containers/Checkout/Checkout'))

const App = (props) => {
  const { onAuthStateCheck } = props
  // converting componentDidMount to useEffect
  useEffect(() => {
    onAuthStateCheck()
  }, [onAuthStateCheck])
  
  let routes
    
  // Dynamically loading routes based on auth status
  if (props.isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/checkout' render={(props) => <LazyCheckout {...props}/>} />
        <Route path='/orders' render={(props) => <LazyOrders {...props}/>} />
        <Route path='/logout' component={Logout} />
    <Route path='/auth' render={(props) => <LazyAuth {...props}/>} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        {/* Switch only loads the first route that matches */}
        <Route path='/auth' render={(props) => <LazyAuth {...props}/>} />
        {/* Exact only loads this route if it matches the path exactly */}
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  )
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
