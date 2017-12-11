import React from 'react'
import Styles from './subhead.styles.scss'

function setFontWeight (props) {
  if (props.bold) {
    return (
        ' is-bold'
    )
  } else {
    return ('')
  }
}

function setSpacing (props) {
  if (props.spaced) {
    return (
        ' is-spaced'
    )
  } else {
    return ('')
  }
}

function setFontColor (props) {
  if (props.color) {
    return (
        ' has-text-' + props.color
    )
  } else {
    return ('')
  }
}

function setAlignment (props) {
  if (props.center) {
    return (
        ' has-text-centered'
    )
  } else {
    return ('')
  }
}

const Subhead = (props) => {
  let styleClasses = 'subtitle subhead is-' + props.size + ' ' + (props.className ? props.className : '')
  styleClasses += setAlignment(props)
  styleClasses += setSpacing(props)
  styleClasses += setAlignment(props)
  styleClasses += setFontColor(props)
  styleClasses += setFontWeight(props)
  let TagName = 'h' + props.size

  return (
    <TagName
      style={Styles.subhead + props.style ? props.style : {}}
      className={styleClasses}
    >
      {props.children}
    </TagName>
  )
}

export default Subhead
