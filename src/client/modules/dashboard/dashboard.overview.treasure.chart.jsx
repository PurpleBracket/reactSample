import React from 'react'
import Panel from '../../atoms/panel/panel'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts'

const data = [
    {name: 'JAN 17', Cashflow: 400, pv: 100, amt: 100},
    {name: 'FEB 17', Cashflow: 1200, pv: 200, amt: 200},
    {name: 'MAR 17', Cashflow: 3900, pv: 300, amt: 300},
    {name: 'APR 17', Cashflow: 8000, pv: 400, amt: 400},
    {name: 'MAY 17', Cashflow: 15000, pv: 500, amt: 500},
    {name: 'JUN 17', Cashflow: 26000, pv: 600, amt: 600},
    {name: 'JUL 17', Cashflow: 37000, pv: 700, amt: 700},
    {name: 'AUG 17', Cashflow: 48000, pv: 800, amt: 800},
    {name: 'SEP 17', Cashflow: 59000, pv: 900, amt: 900},
    {name: 'OCT 17', Cashflow: 100000, pv: 1000, amt: 1000},
    {name: 'NOV 17', Cashflow: 120000, pv: 1200, amt: 1200},
    {name: 'DEC 17', Cashflow: 240000, pv: 1200, amt: 1200}
]

const CashflowChart = (props) => {
  return (
    <Panel paddingSM noShadow>
      <ResponsiveContainer width={'100%'} height={320}>
        <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>

          <defs>
            <linearGradient id='gradient' x1='0' y1='0' x2='1' y2='0'>
              <stop offset='0%' stopColor='#a6a2c4' stopOpacity={0.3} />
              <stop offset='45%' stopColor='#7056bd' stopOpacity={0.5} />
              <stop offset='90%' stopColor='#3807b7' stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' axisLine={false} />
          <YAxis axisLine={false} />
          <CartesianGrid strokeDasharray='3 3' vertical={false} />
          <Tooltip />
          <Area type='monotone' dataKey='Cashflow' stroke='#3807b7' fill='url(#gradient)' />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  )
}

export default CashflowChart
