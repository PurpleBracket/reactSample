import React, { Component } from 'react'
import Panel from '../../atoms/panel/panel'
import Subhead from '../../atoms/subhead/subhead'
import LinkAtom from '../../atoms/link/link'
import Input from '../../atoms/inputField/input'
import Button from '../../atoms/button/button'
import SignupClient from '../../../packages/express-plus/src/client/signupclient'
import Styles from './passwordReset.form.style.scss'

export default class PasswordResetForm extends Component {
  constructor (props) {
    super(props)
    this.client = new SignupClient()
    this.state = {
      formSubmitted: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    global.logger.log(this.state)
    // TODO: sort out implementation for this
    this.client.login(this.state)
        .then(res => {
          this.props.history.push('/signin')
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
            <Panel className={'passwordReset'} style={Styles.passwordReset} transparentBG noShadow noBorder>
              <Subhead size='4'>Reset Your Password</Subhead>
              <form className={'card-content'} onSubmit={this.handleSubmit}>
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

                <div className={'field buttons is-centered'}>
                  <Button color='white' style={this.state.formSubmitted ? 'loading' : ''} type={'submit'}>
                    Reset Password
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
              </footer>
            </Panel>
          </div>
          <div className={'column'} />
        </div>
      </div>
    )
  }
}
