import React, { Component } from 'react'
import NavLogo from '../../atoms/nav/nav.logo'
import NavLink from '../../atoms/nav/nav.link'
// import UserDropdown from '../../atoms/nav/nav.user.dropdown'
import Styles from './sidebar.styles.scss'

export default class Sidebar extends Component {
  constructor (props) {
    super()
    this.state = {
      collapsed: true
    }
  }

  componentWillMount () {
    this.setState({collapsed: this.props.collapsed})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      this.setState({collapsed: nextProps.collapsed})
      return true
    } else {
      return false
    }
  }

  render () {
    if (this.props.hasCompany && this.props.hasAccount) {
      return (
        <div style={Styles.sidebar} className={this.state.collapsed ? 'sidebar' : 'sidebar expanded'}>
          <NavLogo
            href={'/app/dashboard'}
            logoFull={!this.state.collapsed}
            logoIcon={this.state.collapsed}
            transparentBG
          />

          <div style={Styles.toggleIcon} className={'toggle-icon tooltip is-tooltip-right is-tooltip-white'} data-tooltip={this.state.collapsed ? 'Expand Sidebar' : 'Minimize Sidebar'} onClick={this.props.toggleSidebar}>
            <p className={'is-size-7'}>
              <span className='icon is-small has-text-white is-size-7'>
                <i className={this.state.collapsed ? 'fa fa-chevron-right' : 'fa fa-chevron-right fa-rotate-180'} aria-hidden='true' />
              </span>
            </p>
          </div>

          <NavLink
            transparentBG
            icon={'tachometer'}
            href='/app/dashboard'
            tooltip={'Dashboard'}
            tooltipDirection={'right'}
            tooltipColor={'white'}
            tooltipActive={this.state.collapsed}
          >
            {this.state.collapsed ? '' : 'Dashboard'}
          </NavLink>

          <NavLink
            transparentBG
            icon={'university'}
            href='/app/banking'
            tooltip={'Banking'}
            tooltipDirection={'right'}
            tooltipColor={'white'}
            tooltipActive={this.state.collapsed}
          >
            {this.state.collapsed ? '' : 'Banking'}
          </NavLink>
        </div>
      )
    } else {
      return (
        <div style={Styles.sidebar} className={this.state.collapsed ? 'sidebar' : 'sidebar expanded'}>
          <NavLogo
            href={'/app/dashboard'}
            logoFull={!this.state.collapsed}
            logoIcon={this.state.collapsed}
            transparentBG
          />
        </div>
      )
    }
  }
}
