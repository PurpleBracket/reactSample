import React from 'react'
import Panel from '../../atoms/panel/panel'
import {
  BarChart,
  Legend,
  ReferenceLine,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const CashflowChart = (props) => {
  return (
    <Panel paddingSM noShadow>
      <ResponsiveContainer width={'100%'} height={320}>
        <BarChart width={600} height={300} data={props.data} stackOffset='sign'
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke='#000' />
          <Bar dataKey='inflow' fill='#8884d8' stackId='stack' />
          <Bar dataKey='outflow' fill='#82ca9d' stackId='stack' />
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  )
}

export default CashflowChart

// <AreaChart data={props.data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
//
// <defs>
// <linearGradient id='gradient' x1='0' y1='0' x2='1' y2='0'>
//   <stop offset='0%' stopColor='#a6a2c4' stopOpacity={0.3} />
// <stop offset='45%' stopColor='#7056bd' stopOpacity={0.5} />
// <stop offset='90%' stopColor='#3807b7' stopOpacity={0.7} />
// </linearGradient>
// </defs>
// <XAxis dataKey='name' axisLine={false} />
// <YAxis axisLine={false} />
// <CartesianGrid strokeDasharray='3 3' vertical={false} />
// <Tooltip />
// <Area type='monotone' dataKey='Cashflow' stroke='#3807b7' fill='url(#gradient)' />
// </AreaChart>
