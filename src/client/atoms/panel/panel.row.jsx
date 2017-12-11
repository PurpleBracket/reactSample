import React from 'react'

const PanelRow = (props) => {
  return (
    <div className={props.level ? 'columns level' : 'columns'}>
      {props.children}
    </div>
  )
}

export default PanelRow
