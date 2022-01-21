import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import styled from 'styled-components'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Container>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </Container>
    )
  }
  return null
}

const DictChart = ({ chartData }) => {
  return (
    <>
      <ResponsiveContainer maxWidth={400} maxHeight={240}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize="12px" fontWeight="500" padding={{ left: 10, right: 10 }} />
          <YAxis fontSize="12px" fontWeight="500" width={20} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="linear" isAnimationActive={true} animationDuration={1500} dataKey="count" stroke="#00A0FF" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

const Container = styled.div`
  width: fit-content;
  height: 36px;
  padding: 8px;
  background-color: #fff;
  opacity: 0.85;
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  .label {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`

export default DictChart
