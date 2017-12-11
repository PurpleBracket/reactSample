import React from 'react'

const InputIcon = (props) => {
  return (
    <span className='icon is-small is-left' style={{height: '50px'}}>
      <i className={'fa fa-' + props.icon} aria-hidden='true' />
    </span>
  )
}

export default InputIcon
