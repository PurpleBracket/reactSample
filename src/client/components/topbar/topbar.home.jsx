import React, { Component } from 'react'
import NavLogo from '../../atoms/nav/nav.logo'
import NavLink from '../../atoms/nav/nav.link'
import Styles from './topbar.home.styles.scss'

export default class TopbarHome extends Component {
  constructor (props) {
    super()
    this.state = {
      menuActive: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu () {
    if (this.state.menuActive) {
      this.setState({menuActive: false})
    } else {
      this.setState({menuActive: true})
    }
  }

  render () {
    return (
      <nav style={Styles.topbarHome} className={'navbar is-dark topbarHome is-fixed-top is-transparent'} role={'navigation'} aria-label={'main' +
      ' navigation'}>
        <div className={'navbar-start'}>
          <div className={'navbar-brand'}>
            <NavLogo logoFull href='/' />

            <button className={'button navbar-burger'} onClick={() => { this.setState({menuActive: !this.state.menuActive}) }}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={'navbar-end'}>
          <div className={this.state.menuActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <NavLink button transparentBG className={'is-primary is-inverted is-outlined'} href='/signup'>
              Create Account
            </NavLink>
            <NavLink button transparentBG className={'is-primary is-inverted is-outlined'} href='/signin'>
              Sign In
            </NavLink>
          </div>
        </div>
      </nav>
    )
  }
}
