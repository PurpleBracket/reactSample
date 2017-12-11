import React from 'react'
import SigninForm from '../modules/signinForm/signin.form'
import Signup from '../modules/signupForm/signup.form'
import Signout from '../modules/signout/signout'
import PasswordResetForm from '../modules/password.reset/passwordReset.form'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/error/notfound'
import TopbarHome from '../components/topbar/topbar.home'
import Footer from '../components/footer/footerlanding'
import HomePage from '../components/home/home'
import StyleGuide from '../modules/styleguide/styleguide'
import Styles from './landing.template.styles.scss'

export default () => {
  return (
    <div className={'landingWrapper'} style={Styles.landingWrapper} >
      <TopbarHome />
      <div className={'container nav-padding'}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/style' component={StyleGuide} />
          <Route exact path='/signin' component={SigninForm} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/password-reset' component={PasswordResetForm} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}
