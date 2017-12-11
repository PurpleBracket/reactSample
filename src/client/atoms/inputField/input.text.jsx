import React from 'react'

const TextInput = (props) => {
  return (
    <input name={props.name} className={'input'} type={props.type} placeholder={props.placeholder} onChange={props.onChange} required={props.required} />
  )
}

export default TextInput
