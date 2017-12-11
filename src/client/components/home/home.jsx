import React from 'react'
import Headline from '../../atoms/headline/headline'
import Subhead from '../../atoms/subhead/subhead'
import Button from '../../atoms/button/button'
import Styles from './home.style.scss'

const Home = (props) => {
  return (
    <div style={Styles.homeContainer} className={'homeContainer'}>
      <div className={'container'}>
        <div className='columns'>
          <div className='column is-three-fifths is-offset-one-fifth'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Headline size='1' spaced color={'white'}>Welcome to Treasure Landing Page!</Headline>
            <Subhead size='3'>Start growing with Treasure</Subhead>
            <Button color='white' style='outline'>Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
