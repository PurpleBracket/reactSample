import React from 'react'
import Panel from '../../atoms/panel/panel'
import Headline from '../../atoms/headline/headline'
import Subhead from '../../atoms/subhead/subhead'
import { FormattedNumber } from 'react-intl'

const FigurePanel = (props) => {
  return (
    <Panel
      paddingSM
      columnSize
      level
      style={{margin: '0 10px'}}
    >
      <Headline size='4' bold spaced center>
        <FormattedNumber value={props.value} style='currency' currency='USD' />
      </Headline>
      <Subhead size='6' center style={{textTransform: 'uppercase'}}>{props.title}</Subhead>
    </Panel>
  )
}

export default FigurePanel
