import React, { createRef, useState, useEffect } from 'react'
import styled from 'styled-components'

const MaysonryLayout = (props) => {
  const { rowHeight, colWidth } = props
  const [spans, setSpans] = useState([])
  const ref = createRef()

  const sumUp = (acc, node) => {
    return acc + node.scrollHeight
  }

  const computeSpans = () => {
    const { rowHeight } = props
    const spans = []
    Array.from(ref.current.children).forEach((child) => {
      const childHeight = Array.from(child.children).reduce(sumUp, 0)
      const span = Math.ceil(childHeight / rowHeight)
      spans.push(span + 1)
      child.style.height = span * rowHeight + `px`
    })
    return setSpans(spans)
  }

  useEffect(() => {
    computeSpans()
    window.addEventListener('resize', computeSpans)

    return () => {
      window.removeEventListener('resize', computeSpans)
    }
  }, [])

  return (
    <>
      <Parent ref={ref} {...props}>
        {props.children.map((child, i) => (
          <Child key={i} span={spans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    </>
  )
}

MaysonryLayout.defaultProps = {
  rowHeight: 10,
  colWidth: `17em`,
}

const Parent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: calc(${(props) => props.rowHeight}px - 2px);
  grid-gap: 2px;
`
const Child = styled.div`
  grid-row: span ${(props) => props.span};
  height: max-content;
`
export default MaysonryLayout
