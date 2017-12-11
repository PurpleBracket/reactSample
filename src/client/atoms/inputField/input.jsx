import React from 'react'
import Label from './input.label'
import TextInput from './input.text'
import DropdownInput from './input.dropdown'
import HelpText from './input.helpText'
import InputIcon from './input.icon'
import Checkbox from './input.checkbox'

function setFieldType (props) {
  const type = props.type
  if (type === 'text') {
    return (
      <TextInput name={props.name} type={props.type} placeholder={props.placeholder} onChange={props.onChange} required />
    )
  } else if (type === 'email') {
    return (
      <TextInput name={props.name} type={'email'} placeholder={props.placeholder} onChange={props.onChange} required />
    )
  } else if (type === 'password') {
    return (
      <TextInput name={props.name} type={'password'} placeholder={props.placeholder} onChange={props.onChange} required />
    )
  } else if (type === 'checkbox') {
    return (
      <Checkbox name={props.name} type={'checkbox'} onChange={props.onChange} children={props.children} required />
    )
  } else if (type === 'dropdown') {
    return (
      <DropdownInput name={props.name} type={'dropdown'} onChange={props.onChange} required />
    )
  }
}

function setLabelType (props) {
  const type = props.type

  if (type === 'checkbox') {

  } else if (props.label) {
    return (
      <Label>{props.label}</Label>
    )
  }
}

function setInputClassName (props) {
  if (props.hasIconRight === true && props.hasIconLeft === true) {
    return (
        'control has-icons-right has-icons-left'
    )
  } else if (props.hasIconLeft === true) {
    return (
        'control has-icons-left'
    )
  } else if (props.hasIconRight === true) {
    return (
        'control has-icons-right'
    )
  } else {
    return (
        'control'
    )
  }
}

const Input = (props) => {
  return (
    <div className={'field'}>
      {setLabelType(props)}
      <div className={setInputClassName(props)}>
        {setFieldType(props)}
        {props.icon ? <InputIcon icon={props.icon} /> : ''}
      </div>
      {props.helpText ? <HelpText> {props.helpText} </HelpText> : ''}
    </div>
  )
}

export default Input
