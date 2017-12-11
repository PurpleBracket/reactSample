/* global */

import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createCompany } from './/company.new.action'
import Input from '../../atoms/inputField/input'
import Button from '../../atoms/button/button'
import Styles from './company.new.form.styles.scss'

class CompanyNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formSubmitted: false
    }
  }

  renderField (field) {
    return (
      <Input
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        hasIconLeft
        hasIconRight
        icon={field.icon}
        required
        {...field.input}
      />
    )
  }

  onSubmit (values) {
    console.log(values)
    this.setState({formSubmitted: true})
    this.props.createCompany({
      ...values,
      admin: window.globalState.get('userId')
    }, (err, res) => {
      // console.log('COMPANY CREATED')
      // console.log(res.body)

      if (err) {
        console.error(`ERROR: ${err}`)
      } else if (res.status !== 200) {
        window.alert(`ERROR: ${JSON.stringify(res.body)}`)
      } else {
        window.globalState.set('companies', [res.body.id])

        if (this.props.onSubmit) {
          this.props.onSubmit()
        }
      }
      // this.history.pushState()
      // this.props.history.push('/app/dashboard')
    })
  }

  render () {
    const {handleSubmit} = this.props

    return (
      <div className={'columns'}>
        <div className={'column is-8 is-offset-2'}>
          <form style={Styles.newCompanyForm} className={'newCompanyForm'} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name='name'
              type='text'
              placeholder='Company Name'
              icon='envelope'
              component={this.renderField}
          />
            <Field
              name='taxId'
              type='text'
              placeholder='Tax Id'
              icon='id-badge'
              component={this.renderField}
            />

            <Button color='white' style={this.state.formSubmitted ? 'loading' : 'outline'} type={'submit'}>
              Save Company
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function validate (values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'Enter a company title!'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'CompanyNewForm'
})(
  connect(null, {createCompany})(withRouter(CompanyNew))
)
