import React from 'react'

import { ReactComponent as HamburgerIcon } from '../styles/icons/햄버거버튼_24dp.svg'

const HeaderHamburder = ({ handleSidebar }) => {
  return (
    <>
      <button style={{ padding: '5px 8px 0' }} onClick={handleSidebar}>
        <HamburgerIcon />
      </button>
    </>
  )
}

export default HeaderHamburder
