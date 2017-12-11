import React from 'react'
import { Link } from 'react-router-dom'
import NavLinkIcon from './nav.link.icon'
import Styles from './nav.link.styles.scss'
import Button from '../button/button'

function setColor (props) {
  if (props.transparentBG && props.dark) {
    return ' nav-link-dark-transparent'
  } else if (props.light) {
    return ' nav-link-light'
  } else if (props.transparentBG) {
    return ' nav-link-transparent'
  } else if (props.dark) {
    return ' nav-link-dark'
  }
}

const NavLink = (props) => {
  let styleClasses = 'nav-link navbar-item'
  styleClasses += setColor(props)

  // let Icon = props.icon ? <NavLinkIcon icon={props.icon} /> : ''
  return (
    <div style={Styles.navLink} className={styleClasses}>
      <p className={'control'}>
        <Link className={'navbar-item'} to={props.href} style={props.icon ? {lineHeight: '2rem'} : {}}>
          {props.icon
            ? <NavLinkIcon
              tooltip={props.tooltip}
              icon={props.icon}
              tooltipDirection={props.tooltipDirection}
              tooltipColor={props.tooltipColor}
              tooltipActive={props.tooltipActive}
          />
          : ''}
          {props.button
            ? <Button className={'is-primary is-inverted is-outlined'}>
              {props.children}
            </Button>
            : props.children
          }
        </Link>
      </p>
    </div>
  )
}

export default NavLink
