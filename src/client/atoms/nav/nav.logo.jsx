import React from 'react'
import LogoFull from '../logo/logo.full'
import LogoIcon from '../logo/logo.icon'
import LogoType from '../logo/logo.type'
import './nav.logo.style.scss'

function setLogoElement (props) {
  if (props.logoFull) {
    return (<LogoFull />)
  } else if (props.logoIcon) {
    return (<LogoIcon />)
  } else if (props.logoType) {
    return (<LogoType />)
  }
}
//
// function setLogoClass (props) {
//   if (props.logoFull) {
//     return ('navbar-item nav-logo')
//   } else if (props.logoIcon) {
//     return ('navbar-item nav-logo nav-logo-icon')
//   } else if (props.logoType) {
//     return ('navbar-item nav-logo nav-logo-type')
//   }
// }

function setIcon (props) {
  if (props.logoIcon === true) {
    return (' nav-logo-icon')
  } else {
    return ''
  }
}

function setTypography (props) {
  if (props.logoType === true) {
    return (' nav-logo-type')
  } else {
    return ''
  }
}

function setTransparentBG (props) {
  if (props.transparentBG === true) {
    return (' transparentBG')
  } else {
    return ''
  }
}

const NavLogo = (props) => {
  let styleClasses = 'navbar-item nav-logo' + setIcon(props) + setTypography(props) + setTransparentBG(props)

  return (
    <a className={styleClasses} href={props.href}>
      {setLogoElement(props)}
    </a>
  )
}

export default NavLogo
