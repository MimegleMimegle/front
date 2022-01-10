import React from 'react'
import { history } from '../redux/ConfigureStore'

import { ReactComponent as ArrowBackIcon } from '../styles/icons/arrow_back_ios_black_24dp.svg'
import { ReactComponent as CloseIcon } from '../styles/icons/X_24dp.svg'

const HeaderGoBack = (props) => {
  return (
    <>
      <button
        style={{ padding: '5px 8px 0' }}
        onClick={() => {
          history.goBack()
        }}
      >
        <ArrowBackIcon />
      </button>
    </>
  )
}

export default HeaderGoBack
