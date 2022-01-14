import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
  const { flex_center, flex_between, flex_align, flex_end, flex_around, column, width, height, padding, margin, overflow, borderBottom, position, children, _onClick } = props
  const styles = {
    flex_center: flex_center,
    flex_between: flex_between,
    flex_align: flex_align,
    flex_end: flex_end,
    flex_around: flex_around,
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
  flex_end: false,
  flex_around: false,
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
  ${(props) => (props.flex_end ? `display: flex; align-items: center; justify-content: flex-end;` : '')}
  ${(props) => (props.flex_around ? `display: flex; align-items: center; justify-content: space-around;` : '')}
`

export default Grid
