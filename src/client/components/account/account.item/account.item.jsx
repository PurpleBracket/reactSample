import React from 'react'
import { FormattedNumber } from 'react-intl'
// import Panel from '../../../atoms/panel/panel'
// import PanelRow from '../../../atoms/panel/panel.row'
// import Headline from '../../../atoms/headline/headline'
// import Subhead from '../../../atoms/subhead/subhead'
// import Button from '../../../atoms/button/button'
// import AccountItemIcon from './account.item.icon'
// import Styles from './account.item.styles.scss'
// import Panel from '../../../atoms/panel/panel'
// import AccountItemIcon from './account.item.icon'

const Account = props => {
  return (
    <div className='box'>
      <article className='media'>
        <div className='media-left'>
          <figure className='image is-64x64'>
            <img src='https://bulma.io/images/placeholders/128x128.png' alt='Image' />
          </figure>
        </div>
        <div className='media-content'>
          <div className='content'>
            <p>
              <strong>{props.name}</strong>
              <small> ...{props.mask}</small>
            </p>
          </div>
          <div className='level'>
            <div className='level-left'>
              <div className='level-item'>
                <div>
                  <p className='heading'>BALANCE</p>
                  <p className='subtitle'>
                    <FormattedNumber value={props.available} style='currency' currency='USD' />
                  </p>
                </div>
              </div>
            </div>
            <div className='level-right'>
              <button onClick={() => { props.onClick(props.accountId) }}>View Details</button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Account
