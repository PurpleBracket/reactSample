import React from 'react'
import 'normalize.css'
import { Switch, Route } from 'react-router-dom'
import AppTemplate from './layouts/app.template'
import LandingTemplate from './layouts/landing.template'

export default () => {
  // componentDidMount () {
  //   console.log('Component did mount: fetching data')
  // }
  //
  // componentDidUpdate (prevProps, prevState) {
  //   console.log('Component did update: Saving data')
  //   // this.state
  //   // this.props
  // }
  //
  // componentWillUnmount () {
  //   console.log('Component will unmount')
  // }

  return (<div>
    <Switch>
      <Route path='/app' component={AppTemplate} />
      <Route path='/' component={LandingTemplate} />
    </Switch>
  </div>)
}
