import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
  const { flex_center, flex_between, flex_align, column, width, height, padding, margin, overflow, borderBottom, position, children, _onClick } = props
  const styles = {
    flex_center: flex_center,
    flex_between: flex_between,
    flex_align: flex_align,
    column: column,
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    overflow: overflow,
    borderBottom: borderBottom,
    position: position,
  }
  return (
    <>
      <GridBox onClick={_onClick} {...styles}>
        {children}
      </GridBox>
    </>
  )
}

Grid.defaultProps = {
  flex_center: false,
  flex_between: false,
  flex_align: false,
  column: false,
  children: null,
  width: '100%',
  height: '',
  padding: false,
  margin: false,
  overflow: 'false',
  borderBottom: false,
  position: false,
  _onClick: () => {},
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => (props.padding ? `${props.padding}` : '')};
  margin: ${(props) => (props.margin ? `${props.margin}` : '')};
  overflow: ${(props) => props.overflow};
  border-bottom: ${(props) => (props.borderBottom ? `${props.borderBottom}` : '')};
  position: ${(props) => (props.position ? `${props.position}` : '')};
  ${(props) => (props.flex_center ? `display: flex; align-items: center; justify-content: center;` : '')}
  ${(props) => (props.flex_between ? `display: flex; align-items: center; justify-content: space-between;` : '')}
  ${(props) => (props.flex_align ? `display: flex; align-items: center;` : '')}
  ${(props) => (props.column ? `flex-direction: column;` : '')}
`

export default Grid
