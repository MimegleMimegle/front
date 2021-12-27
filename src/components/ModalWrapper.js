import React from 'react'
import styled from 'styled-components'

const ModalWrapper = ({ visible, children, onClose, maskClosable }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }
  return (
    <>
      <ModalOverlay visible={visible}>
        <Wrapper tabIndex="-1" visible={visible} onClick={maskClosable ? onMaskClick : null}>
          {children}
        </Wrapper>
      </ModalOverlay>
    </>
  )
}

const ModalOverlay = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 2999;
`

const Wrapper = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 3000;
`

export default ModalWrapper
