import React from 'react'
import Styles from './panel.styles.scss'

function setPanelPadding (props) {
  if (props.padding) {
    return (
        ' is-padded'
    )
  } else if (props.paddingSM) {
    return (
        ' is-padded--sm'
    )
  } else {
    return ('')
  }
}

function setPanelShadow (props) {
  if (props.noShadow) {
    return (
        ' is-noShadow'
    )
  } else {
    return ('')
  }
}

function setPanelBorder (props) {
  if (props.noBorder) {
    return (
        ' is-noBorder'
    )
  } else {
    return ('')
  }
}

function setPanelActivity (props) {
  if (props.passive) {
    return (
        ' is-passive'
    )
  } else {
    return ('')
  }
}

function setPanelTransparency (props) {
  if (props.transparentBG) {
    return (
        ' is-transparent--bg'
    )
  } else {
    return ('')
  }
}

function setPanelColumnSize (props) {
  if (props.columnSize) {
    return (' column ' + props.columnSize)
  } else {
    return ('')
  }
}

function setPanelLevel (props) {
  if (props.level) {
    return (' level-item')
  } else {
    return ('')
  }
}

function setPanelStatus (props) {
  if (props.passive) {
    return (' .is-passive')
  } else {
    return ('')
  }
}

const Panel = (props) => {
  let styleClasses = 'card panel ' + (props.className ? props.className : '')
  styleClasses += setPanelTransparency(props)
  styleClasses += setPanelPadding(props)
  styleClasses += setPanelShadow(props)
  styleClasses += setPanelBorder(props)
  styleClasses += setPanelActivity(props)
  styleClasses += setPanelColumnSize(props)
  styleClasses += setPanelLevel(props)
  styleClasses += setPanelStatus(props)

  return (
    <div style={Styles.panel + props.style ? props.style : {}} className={styleClasses}>
      {props.children}
    </div>
  )
}

export default Panel
