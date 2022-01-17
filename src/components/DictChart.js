import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts'
import styled from 'styled-components'

const data = [
  {
    name: '토',
    cnt: 10,
  },
  {
    name: '일',
    cnt: 19,
  },
  {
    name: '월',
    cnt: 10,
  },
  {
    name: '화',
    cnt: 34,
  },
  {
    name: '수',
    cnt: 10,
  },
  {
    name: '목',
    cnt: 8,
  },
  {
    name: '오늘',
    cnt: 22,
  },
]

const getIntroOfPage = (label) => {
  if (label === '토') {
    return ''
  }
  if (label === '일') {
    return ''
  }
  if (label === '월') {
    return ''
  }
  if (label === '화') {
    return ''
  }
  if (label === '수') {
    return ''
  }
  if (label === '오늘') {
    return ''
  }
  return ''
}

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

const DictChart = (props) => {
  return (
    <>
      <ResponsiveContainer maxWidth={400} maxHeight={240}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
          <XAxis dataKey="name" fontSize="12px" fontWeight="500" padding={{ left: 10, right: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="linear" isAnimationActive={true} animationDuration={1500} dataKey="cnt" stroke="#6698FC" strokeWidth={2} activeDot={{ r: 8 }} />
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
