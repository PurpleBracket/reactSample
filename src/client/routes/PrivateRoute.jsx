import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    window.globalState.isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: {from: props.location}
      }} />
    )
  )} />
)
