import React from 'react'
import { history } from '../redux/ConfigureStore'

import { ReactComponent as CloseIcon } from '../styles/icons/X_24dp.svg'

const HeaderClose = (props) => {
  return (
    <>
      <button
        style={{ padding: '5px 8px 0' }}
        onClick={() => {
          history.goBack()
        }}
      >
        <CloseIcon />
      </button>
    </>
  )
}

export default HeaderClose
