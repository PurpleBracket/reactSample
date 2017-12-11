import React from 'react'

const Label = (props) => {
  return (
    <label htmlFor={props.name} className={'label'}>{props.children}</label>
  )
}

export default Label
