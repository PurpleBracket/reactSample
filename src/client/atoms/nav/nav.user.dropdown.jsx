import React from 'react'
import Styles from './nav.user.dropdown.styles.scss'
import LinkAtom from '../../atoms/link/link'
import NavLink from '../../atoms/nav/nav.link'

// function setTitleSpacing (props) {
//     if (props.spaced) {
//         return (
//             ' is-spaced'
//         )
//     } else {
//         return ('')
//     }
// }

const UserDropdown = (props) => {
  // let styleClasses = 'title is-'
    // styleClasses += setTitleSpacing(props)
    // styleClasses += setFontWeight(props)
    // styleClasses += ' headline'
    // let TagName = 'h' + props.size
  return (
    <div style={Styles.userDropdown} className='navbar-item has-dropdown user-dropdown'>
      <div className='dropdown is-right is-hoverable'>
        <div className='dropdown-trigger'>
          <NavLink dark={props.dark} light={props.light} transparentBG={props.transparentBG} href='#' aria-haspopup='true' aria-controls='dropdown-menu' style={{padding: '0px'}}>
            <span className='icon' style={{marginRight: '10px'}}>
              <i className='fa fa-lg fa-user-circle-o' aria-hidden='true' />
            </span>
            <span>Company Name &nbsp;</span>
          </NavLink>
        </div>
        <div className='dropdown-menu' role='menu'>
          <div className='dropdown-content'>
            <div className='dropdown-item'>
              <LinkAtom href='/signout'>
                Sign Out
              </LinkAtom>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDropdown
