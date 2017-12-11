import React, { Component } from 'react'
import Panel from '../../atoms/panel/panel'
import Subhead from '../../atoms/subhead/subhead'
import LinkAtom from '../../atoms/link/link'
import Input from '../../atoms/inputField/input'
import Button from '../../atoms/button/button'
import userClient from '../../components/user/user.client'
import companyClient from '../company.forms/company.client'
import SigninClient from '../../../packages/express-plus/src/client/signinclient'
import Styles from './signin.form.style.scss'

export default class SigninForm extends Component {
  constructor (props) {
    super(props)

    this.client = SigninClient

    this.state = {
      formSubmitted: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    if (typeof (window) !== 'undefined') { // hack for test
      window.globalState.clearGlobalState()
    }
  }

  handleSubmit (e) {
    // var self = this;
    e.preventDefault()
    this.setState({formSubmitted: true})
    this.client.login(this.state)
      .then(res => {
        userClient.getCompaniesByUserId(res.body.id)
          .then(res => {
            // window.globalState.set('user', res.body.name)
            window.globalState.set('companies', res.body.companies)
            window.globalState.syncLocalStorage()

            if (res.body.companies.length > 0) {
              companyClient.getByCompanyId(res.body.companies[0])
                .then(res => {
                  window.globalState.set('companiesArray', res.body)
                  this.props.history.push('/app/dashboard')
                })
                .catch(err => {
                  console.error(err)
                })
            } else {
              this.props.history.push('/app/dashboard')
            }
          })
      })
      .catch(err => {
        console.error(err)
        this.setState({formSubmitted: false})
        this.setState({formError: 'Wrong email or password. Please try again.'})
      })
  }

  handleInputChange (event) {
    if (event) {
      const target = event.target
      const value = target.type === 'checkbox' ? target.checked : target.value
      const name = target.name

      this.setState({
        [name]: value
      })
    }
  }

  render () {
    return (
      <div>
        <div className={'columns'}>
          <div className={'column'} />
          <div className={'column is-one-third'} style={{minHeight: '100vh'}}>
            <Panel className={'signinForm'} style={Styles.signinForm} transparentBG noShadow noBorder>
              <Subhead size='4'>Sign In</Subhead>
              <form className={'card-content'} onSubmit={this.handleSubmit}>
                {this.state.formError ? <Subhead size='6' color={'white'}>{this.state.formError} <LinkAtom href='reset-password'>Forgot your password?</LinkAtom></Subhead> : ''}
                <Input
                  name='email'
                  type='email'
                  placeholder='Email Address'
                  hasIconLeft
                  hasIconRight
                  icon='envelope'
                  onChange={this.handleInputChange}
                  required
                />

                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  hasIconLeft
                  hasIconRight
                  icon='unlock-alt'
                  onChange={this.handleInputChange}
                  required
                />

                <div className={'field buttons is-centered'}>
                  <Button color='white' style={this.state.formSubmitted ? 'loading' : ''} type={'submit'}>
                    Sign In
                  </Button>
                </div>

              </form>
              <footer className='card-footer'>
                <p className='card-footer-item'>
                  <span>
                    <LinkAtom href='/signup'>
                            Don't have an account? <br /> <b>Create an account</b>
                    </LinkAtom>
                  </span>
                </p>
                <p className='card-footer-item'>
                  <span>
                    <LinkAtom href='/password-reset'>
                            Forgot Password?
                    </LinkAtom>
                  </span>
                </p>
              </footer>
            </Panel>
          </div>
          <div className={'column'} />
        </div>
      </div>
    )
  }
}
