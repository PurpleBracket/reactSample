import React from 'react'
import Headline from '../../atoms/headline/headline'
import Subhead from '../../atoms/subhead/subhead'
import Button from '../../atoms/button/button'
import Input from '../../atoms/inputField/input'
import Paragraph from '../../atoms/paragraph/paragraph'
import Link from '../../atoms/link/link'
import Panel from '../../atoms/panel/panel'
import Styles from './styleguide.style.scss'

export default () => {
  return (
    <div style={Styles.homeContainer} className={'homeContainer'}>
      <div className={'container'}>
        <Headline size='1'>Welcome to Treasure Landing Page!</Headline>
        <Headline size='2'>Welcome to Treasure Landing Page!</Headline>
        <Headline size='3'>Welcome to Treasure Landing Page!</Headline>
        <Headline size='4'>Welcome to Treasure Landing Page!</Headline>
        <Headline size='5'>Welcome to Treasure Landing Page!</Headline>
        <Headline size='6'>Welcome to Treasure Landing Page!</Headline>

        <br />
        <br />

        <Subhead size='1' bold>Welcome to Treasure Landing Page!</Subhead>
        <Subhead size='2' bold>Welcome to Treasure Landing Page!</Subhead>
        <Subhead size='3' bold>Welcome to Treasure Landing Page!</Subhead>
        <Subhead size='4' bold>Welcome to Treasure Landing Page!</Subhead>
        <Subhead size='5' bold>Welcome to Treasure Landing Page!</Subhead>
        <Subhead size='6' bold>Welcome to Treasure Landing Page!</Subhead>

        <br />
        <br />

        <Paragraph>
                Bacon ipsum dolor amet brisket tenderloin shoulder sausage turducken hamburger, venison shankle tail prosciutto boudin salami ball tip. Chicken leberkas kielbasa ground round. Tri-tip ground round ham, ball tip filet mignon pancetta capicola. Alcatra meatloaf rump biltong. Kielbasa pork tri-tip meatloaf jowl, ground round sirloin hamburger pork chop shankle t-bone ribeye fatback frankfurter. Venison tenderloin ground round hamburger shankle flank turkey buffalo biltong meatloaf prosciutto pork chop corned beef cow. Spare ribs turducken chuck boudin landjaeger short loin, biltong frankfurter jowl porchetta.
        </Paragraph>

        <br />
        <br />

        <Button color='white'>Learn More</Button>
        <Button color='black'>Learn More</Button>
        <Button color='primary'>Learn More</Button>
        <Button color='warning'>Learn More</Button>
        <Button color='danger'>Learn More</Button>

        <br />
        <br />

        <Button color='white' style='outline'>Learn More</Button>
        <Button color='black' style='outline'>Learn More</Button>
        <Button color='primary' style='outline'>Learn More</Button>
        <Button color='warning' style='outline'>Learn More</Button>
        <Button color='danger' style='outline'>Learn More</Button>

        <br />
        <br />

        <Button color='white' style='invert'>Learn More</Button>
        <Button color='black' style='invert'>Learn More</Button>
        <Button color='primary' style='invert'>Learn More</Button>
        <Button color='warning' style='invert'>Learn More</Button>
        <Button color='danger' style='invert'>Learn More</Button>

        <br />
        <br />

        <Button color='white' style='loading'>Learn More</Button>
        <Button color='black' style='loading'>Learn More</Button>
        <Button color='primary' style='loading'>Learn More</Button>
        <Button color='warning' style='loading'>Learn More</Button>
        <Button color='danger' style='loading'>Learn More</Button>

        <br />
        <br />

        <Link href='#'>Learn More</Link>

        <br />
        <br />

        <Input
          type='text'
          label='Text Input Label'
          placeholder='Text Input'
            />

        <Input
          type='email'
          label='Email Input Label'
          placeholder='Email Input'
            />

        <Input
          type='password'
          label='Password Input Label'
          placeholder='Password Input'
          hasIconLeft
          icon='envelope'
          helpText='Min Length 8 Characters'
            />

        <Input
          type='checkbox'
          label='checkbox Input Label'
          placeholder='checkbox Input'
            />

        <Input
          type='dropdown'
          label='Dropdown Input Label'
          placeholder='Dropdown Input'
            />

        <Panel>
          <Headline size='3' spaced>Welcome to Treasure Landing Page!</Headline>
          <Subhead size='5'>Welcome to Treasure Landing Page!</Subhead>
          <Button color='primary' style='outline'>Learn More</Button>
        </Panel>
      </div>
    </div>
  )
}
