import React from 'react'
import styled from 'styled-components'

import Grid from '../../elements/Grid'
import { IoCloseOutline } from 'react-icons/io5'

const AlarmModal = ({ onClose }) => {
  return (
    <>
      <Container>
        <Grid flex_between>
          <div></div>
          <IoCloseOutline className="close-icon" onClick={onClose} />
        </Grid>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  top: 56px;
  right: 16px;
  width: 60%;
  height: fit-content;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 35px 4px hsl(0deg 0% 64% / 25%);
  transition: 0.5s;
  z-index: 9999;
  .close-icon {
    font-size: 20px;
    cursor: pointer;
  }
`

export default AlarmModal
