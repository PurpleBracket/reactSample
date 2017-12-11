import React, { Component } from 'react'
// import NavLogo from '../../atoms/nav/nav.logo'
import NavLink from '../../atoms/nav/nav.link'
import UserDropdown from '../../atoms/nav/nav.user.dropdown'
import Styles from './topbar.dashboard.styles.scss'

export default class TopbarDashboard extends Component {
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
      <nav style={Styles.topbarApp} className={'navbar is-fixed-top is-dark topbarApp'} role='navigation' aria-label='main navigation'>
        <div className={'navbar-start'}>
          <div className={'navbar-brand'}>
            <button className={'button navbar-burger'} onClick={() => { this.setState({menuActive: !this.state.menuActive}) }} onBlur={() => { this.setState({menuActive: false}) }}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={'navbar-end'}>
          {this.props.hasCompany
              ? <div className={this.state.menuActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                <NavLink href='/app/dashboard' onClick={() => { this.setState({menuActive: false}) }}>
                  Dashboard
                </NavLink>

                <NavLink href='/app/banking' onClick={() => { this.setState({menuActive: false}) }}>
                  Banking
                </NavLink>
              </div>
          : ''}
          <UserDropdown transparentBG dark />
        </div>
      </nav>
    )
  }
}

// <NavLogo logoType href={'/app/dashboard'} />
