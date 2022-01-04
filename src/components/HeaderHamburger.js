import React from 'react'

import { FiMenu } from 'react-icons/fi'

const HeaderHamburder = ({ handleSidebar }) => {
  return (
    <>
      <button style={{ padding: '5px 10px 0', fontSize: '20px' }} onClick={handleSidebar}>
        <FiMenu />
      </button>
    </>
  )
}

export default HeaderHamburder
