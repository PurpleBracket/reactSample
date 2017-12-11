/* global describe test expect */
import React from 'react'
import { shallow } from 'enzyme'
import Paragraph from './paragraph'

describe('Headline', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Paragraph>Bacon ipsum dolor amet brisket tenderloin shoulder sausage turducken hamburger, venison shankle tail prosciutto boudin salami ball tip. Chicken leberkas kielbasa ground round. Tri-tip ground round ham, ball tip filet mignon pancetta capicola. Alcatra meatloaf rump biltong. Kielbasa pork tri-tip meatloaf jowl, ground round sirloin hamburger pork chop shankle t-bone ribeye fatback frankfurter. Venison tenderloin ground round hamburger shankle flank turkey buffalo biltong meatloaf prosciutto pork chop corned beef cow. Spare ribs turducken chuck boudin landjaeger short loin, biltong frankfurter jowl porchetta.</Paragraph>)
    expect(wrapper).toMatchSnapshot()
  })
})
