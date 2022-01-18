import React from 'react'
import '../styles/css/SpeedDialButton.css'
import { history } from '../redux/ConfigureStore'
import { ReactComponent as DictPageAddButton } from '../styles/icons/추가_18dp.svg'

const SpeedDialButton = (props) => {
  return (
    <>
      <div
        className="DictPageAddButton"
        onClick={() => {
          history.push('/dict/write')
        }}
      >
        <DictPageAddButton width="30px" height="30px" fill="#FFFFFF" />
      </div>
    </>
  )
}

export default SpeedDialButton
