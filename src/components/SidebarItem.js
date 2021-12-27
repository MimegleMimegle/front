import React from 'react'
import styled from 'styled-components'

import { history } from '../redux/ConfigureStore'

const SidebarItem = ({ menu, isActive, setShowSidebar }) => {
  return (
    <>
      <MenuItem
        className={`${isActive ? 'active' : ''}`}
        onClick={() => {
          history.push(`${menu.path}`)
          setShowSidebar(false)
        }}
      >
        {menu.name}
      </MenuItem>
    </>
  )
}

const MenuItem = styled.button`
  width: 100%;
  padding: 20px 16px;
  border-bottom: 1px solid #111;
  text-align: left;
  font-weight: 700;
  font-size: 16px;
`

export default SidebarItem
