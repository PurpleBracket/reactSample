import React from 'react'

function hasTooltip (props) {
  if (props.tooltip) {
    return (' tooltip')
  } else {
    return ('')
  }
}

function setTooltipDirection (props) {
  return (' is-tooltip-' + props.tooltipDirection || 'right')
}

function setTooltipColor (props) {
  return (' is-tooltip-' + props.tooltipColor || 'white')
}

const NavLinkIcon = (props) => {
  let styleClasses = 'icon is-medium is-left'
  if (props.tooltipActive) {
    styleClasses += hasTooltip(props)
    styleClasses += setTooltipDirection(props)
    styleClasses += setTooltipColor(props)
  }
  let tooltipContent = props.tooltipActive ? props.tooltip : ''

  return (
    <span
      className={styleClasses}
      style={{height: '50px', marginRight: '10px'}}
      data-tooltip={tooltipContent}
    >
      <i className={'fa fa-lg fa-' + props.icon} aria-hidden='true' />
    </span>
  )
}

export default NavLinkIcon
