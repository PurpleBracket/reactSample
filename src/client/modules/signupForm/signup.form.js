import React, { Component } from 'react'
import Panel from '../../atoms/panel/panel'
import Subhead from '../../atoms/subhead/subhead'
import LinkAtom from '../../atoms/link/link'
import Input from '../../atoms/inputField/input'
import Button from '../../atoms/button/button'
import SignupClient from '../../../packages/express-plus/src/client/signupclient'
import Styles from './signup.form.style.scss'

export default class SignupForm extends Component {
  constructor (props) {
    super(props)

    this.client = new SignupClient()

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
    e.preventDefault()
    this.setState({formSubmitted: true})
    console.log(this.state)
    this.client.createUser(this.state)
        .then(res => {
          this.props.history.push('/app/dashboard')
        })
        .catch(err => {
          console.log(err)
          this.setState({formSubmitted: false})
          this.setState({formError: 422})
        })
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div>
        <div className={'columns'}>
          <div className={'column is-one-third is-offset-one-third'} style={{minHeight: '100vh'}}>
            <Panel className={'signupForm'} style={Styles.signupForm} transparentBG noShadow noBorder>
              <Subhead size='4'>Start growing with Treasure</Subhead>
              <form className={'card-content'} onSubmit={this.handleSubmit}>
                {this.state.formError ? <Subhead size='6' color={'white'}>An account already exists for that email. Please <LinkAtom href='/signin'>sign in</LinkAtom>, or <LinkAtom href='reset-password'>reset your password.</LinkAtom></Subhead> : ''}
                <Input
                  name='name'
                  type='text'
                  placeholder='Name'
                  hasIconLeft
                  hasIconRight
                  icon='user'
                  onChange={this.handleInputChange}
                  required
                />

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

                <Input
                  name='policy'
                  type='checkbox'
                  onChange={this.handleInputChange}
                  required
                >
                  I agree to <LinkAtom href={'#'}>Treasure’s Terms of Use</LinkAtom> & consent to <LinkAtom href={'#'}>Treasure’s Privacy Policy</LinkAtom>
                </Input>

                <div className={'field buttons is-centered'}>
                  <Button color='white' style={this.state.formSubmitted ? 'loading' : ''} type={'submit'}>
                    Sign Up
                  </Button>
                </div>
              </form>
              <footer className='card-footer'>
                <p className='card-footer-item'>
                  <span>
                    <LinkAtom href='/signin'>
                            Already have an account? <br /> <b>Sign In</b>
                    </LinkAtom>
                  </span>
                </p>
              </footer>
            </Panel>
          </div>
        </div>
      </div>
    )
  }
}
