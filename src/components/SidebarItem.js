import React from 'react'
import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'

const SidebarItem = ({ menu, isActive, setShowSidebar }) => {
  return (
    <>
      <button
        className={`${isActive ? 'active' : ''}`}
        onClick={() => {
          history.push(`${menu.path}`)
          setShowSidebar(false)
        }}
      >
        {menu.name}
      </button>
    </>
  )
}

export default SidebarItem
