import React from 'react'
import Styles from './account.item.icon.styles.scss'

function setIcon (props) {
  if (props.type === 'bank') {
    return ('university')
  } else if (props.type === 'cc') {
    return ('credit-card')
  }
}

const AccountItemIcon = (props) => {
  let icon = 'fa fa-lg fa-'
  icon += setIcon(props)
  return (
    <span className='icon account-item--icon' style={Styles.accountItemIcon}>
      <i className={icon} aria-hidden='true' />
    </span>
  )
}

export default AccountItemIcon
