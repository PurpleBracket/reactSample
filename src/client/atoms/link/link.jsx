import React from 'react'
import { Link } from 'react-router-dom'

const LinkAtom = (props) => {
  return (
    <Link to={props.href}>
      {props.children}
    </Link>
  )
}

export default LinkAtom
