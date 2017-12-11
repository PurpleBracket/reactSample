import React from 'react'

function setButtonColor (props) {
  if (props.color === 'white') {
    return ' is-white'
  } else if (props.color === 'black') {
    return ' is-black'
  } else if (props.color === 'primary') {
    return ' is-primary'
  } else if (props.color === 'success') {
    return ' is-success'
  } else if (props.color === 'warning') {
    return ' is-warning'
  } else if (props.color === 'danger') {
    return ' is-danger'
  }
}

function setButtonStyle (props) {
  if (props.style === 'outline') {
    return ' is-outlined'
  } else if (props.style === 'invert') {
    return ' is-inverted'
  } else if (props.style === 'outline invert') {
    return ' is-outlined is-inverted'
  }
}

function setButtonLoading (props) {
  return ' is-loading'
}

const Button = (props) => {
  let styleClasses = 'button'

  if (props.className) {
    styleClasses += ' ' + props.className
  }

  if (props.color) {
    styleClasses += setButtonColor(props)
  }

  if (props.style) {
    styleClasses += setButtonStyle(props)
  }

  if (props.style === 'loading') {
    styleClasses += setButtonLoading(props)
  }

  return (
    <button
      className={styleClasses}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
