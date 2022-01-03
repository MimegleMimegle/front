import React from 'react'
import styled from 'styled-components'
import { imageApi } from '../../shared/api'
import { history } from '../../redux/ConfigureStore'

import { IoCloseOutline } from 'react-icons/io5'

const ThreeDotsMenu = ({ boardId, handleThreeDotsToggleMenu }) => {
  const handleDeleteImage = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await imageApi
      .deleteImage(boardId)
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        history.push('/image')
      })
      .catch((error) => {
        console.log('이미지 삭제 문제 발생', error.response)
      })
  }

  return (
    <>
      <ThreeDotsToggleMenu>
        <div style={{ width: '100%', padding: '5px 5px', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
          <button style={{ padding: '0', height: '100%' }} onClick={handleThreeDotsToggleMenu}>
            <IoCloseOutline style={{ fontSize: '18px', color: '#111' }} />
          </button>
        </div>
        <div style={{ width: '100%', padding: '8px 5px', borderTop: '1px solid #c4c4c4', display: 'flex', alignItems: 'center' }}>
          <button style={{ fontSize: '12px', padding: '0' }} onClick={handleDeleteImage}>
            삭제하기
          </button>
        </div>
      </ThreeDotsToggleMenu>
    </>
  )
}

const ThreeDotsToggleMenu = styled.div`
  position: absolute;
  top: 75px;
  right: 15px;
  width: 80px;
  height: 70px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  z-index: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const EachMenu = styled.button``

export default ThreeDotsMenu
