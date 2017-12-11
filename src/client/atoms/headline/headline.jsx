import React from 'react'
import Styles from './headline.styles.scss'

function setTitleSpacing (props) {
  if (props.spaced) {
    return (
        ' is-spaced'
    )
  } else {
    return ('')
  }
}

function setFontWeight (props) {
  if (props.bold) {
    return (
        ' is-bold'
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

const Headline = (props) => {
  let styleClasses = 'title headline is-' + props.size
  styleClasses += setTitleSpacing(props)
  styleClasses += setFontWeight(props)
  styleClasses += setFontColor(props)
  styleClasses += setAlignment(props)

  let TagName = 'h' + props.size
  return (
    <TagName
      style={Styles.headline + props.style ? props.style : {}}
      className={styleClasses}
    >
      {props.children}
    </TagName>
  )
}

export default Headline
