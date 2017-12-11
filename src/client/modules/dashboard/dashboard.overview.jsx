import React, { Component } from 'react'
import PanelRow from '../../atoms/panel/panel.row'
// import Panel from '../../atoms/panel/panel'
import FigurePanel from './dashboard.overview.figures.panel'
import dashboardClient from './dashboard.client'
import CashflowChart from './dashboard.overview.cashflow.chart'

export default class DashboardOverview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentWillMount () {
    dashboardClient.getSummaryByCompanyId(window.globalState.getCompanyId())
      .then(response => {
        console.log(response)
        this.setState({data: response.body})
      })
      .catch(err => {
        console.error(err)
      })
  }

  render () {
    if (!this.state.data) {
      return 'Fetching Summary...'
    }

    return (
      <div className='dashboard-overview'>
        <PanelRow
          level
        >
          <FigurePanel
            title={'Total Capital'}
            value={this.state.data.TotalCapital}
          />

          <FigurePanel
            title={'Available Cash'}
            value={this.state.data.AvailableCash}
          />

          <FigurePanel
            title={'Treasure'}
            value={this.state.data.Treasure}
          />

          <FigurePanel
            title={'Total Outflow'}
            value={this.state.data.TotalOutflow}
          />
        </PanelRow>
        <CashflowChart data={this.state.data.CashFlowChart} />
      </div>
    )
  }
}
