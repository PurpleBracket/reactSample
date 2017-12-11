import React from 'react'
// import Panel from '../../atoms/panel/panel'
import { FormattedNumber } from 'react-intl'

const TransactionItem = props => {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props.name}</td>
      <td><FormattedNumber value={props.amount} style='currency' currency='USD' /></td>
    </tr>
  )
}

export default TransactionItem

// <div className='level'>
//   <div className="level-left">{props.date}</div>
// <div className="level-item">{props.name}</div>
// <div className="level-right">
//   <FormattedNumber value={props.amount} style='currency' currency='USD'/>
//   </div>
// </div>
