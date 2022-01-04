import React from 'react'
import { history } from '../redux/ConfigureStore'

import { MdArrowBackIosNew } from 'react-icons/md'
import { MdOutlineClose } from 'react-icons/md'

const HeaderGoBack = ({ type }) => {
  return (
    <>
      <button
        style={{ padding: '5px 10px 0', fontSize: '20px' }}
        onClick={() => {
          history.goBack()
        }}
      >
        {type === 'PostEdit' ? <MdArrowBackIosNew /> : <MdOutlineClose />}
      </button>
    </>
  )
}

export default HeaderGoBack
