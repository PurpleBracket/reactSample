import React from 'react'
import Styles from './input.checkbox.styles.scss'

const Checkbox = (props) => {
  return (
    <div style={Styles.checkboxInput} className={'checkboxInput'}>
      <input name={props.name} type={props.type} onChange={props.onChange} required={props.required} />
      <label htmlFor={props.name}>
        {props.children}
      </label>
    </div>
  )
}

export default Checkbox
